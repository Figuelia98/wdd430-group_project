import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { requireSeller, getUserFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const seller = searchParams.get('seller');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const featured = searchParams.get('featured') === 'true';

    let query: any = { isActive: true };

    // Filter by category
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    // Filter by seller
    if (seller) {
      query.seller = seller;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Featured products filter
    if (featured) {
      query.isFeatured = true;
    }

    // Sorting
    let sortQuery: any = {};
    switch (sort) {
      case 'price-low':
        sortQuery = { price: 1 };
        break;
      case 'price-high':
        sortQuery = { price: -1 };
        break;
      case 'rating':
        sortQuery = { averageRating: -1, totalReviews: -1 };
        break;
      case 'popular':
        sortQuery = { totalReviews: -1, averageRating: -1 };
        break;
      case 'newest':
      default:
        sortQuery = { createdAt: -1 };
        break;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get products
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .populate('seller', 'name businessName')
      .select('name slug shortDescription price comparePrice images averageRating totalReviews isFeatured createdAt')
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json(
      {
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireSeller(request);
    await connectDB();

    const body = await request.json();
    const {
      name,
      description,
      shortDescription,
      price,
      comparePrice,
      images,
      category,
      inventory,
      dimensions,
      materials,
      tags
    } = body;

    // Validation
    if (!name || !description || !price || !images || !category) {
      return NextResponse.json(
        { error: 'Name, description, price, images, and category are required' },
        { status: 400 }
      );
    }

    if (price <= 0) {
      return NextResponse.json(
        { error: 'Price must be greater than 0' },
        { status: 400 }
      );
    }

    if (comparePrice && comparePrice <= price) {
      return NextResponse.json(
        { error: 'Compare price must be greater than regular price' },
        { status: 400 }
      );
    }

    // Verify category exists
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    // Ensure unique slug
    let slug = baseSlug;
    let counter = 1;
    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create product
    const product = new Product({
      name: name.trim(),
      slug,
      description: description.trim(),
      shortDescription: shortDescription?.trim(),
      price,
      comparePrice,
      images,
      category,
      seller: user.id,
      inventory: {
        quantity: inventory?.quantity || 0,
        trackQuantity: inventory?.trackQuantity !== false,
        allowBackorder: inventory?.allowBackorder || false
      },
      dimensions,
      materials: materials?.map((m: string) => m.trim()).filter(Boolean),
      tags: tags?.map((t: string) => t.toLowerCase().trim()).filter(Boolean)
    });

    await product.save();

    // Populate for response
    await product.populate([
      { path: 'category', select: 'name slug' },
      { path: 'seller', select: 'name businessName' }
    ]);

    return NextResponse.json(
      {
        message: 'Product created successfully',
        product
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Create product error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
