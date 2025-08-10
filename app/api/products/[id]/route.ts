import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { requireSeller, getUserFromToken } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;
    
    const product = await Product.findById(id)
      .populate('category', 'name slug')
      .populate('seller', 'name businessName');

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { product },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireSeller(request);
    await connectDB();

    const { id } = params;
    const body = await request.json();

    // Find the product
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if user owns this product
    if (product.seller.toString() !== user.id) {
      return NextResponse.json(
        { error: 'You can only update your own products' },
        { status: 403 }
      );
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).populate([
      { path: 'category', select: 'name slug' },
      { path: 'seller', select: 'name businessName' }
    ]);

    return NextResponse.json(
      {
        message: 'Product updated successfully',
        product: updatedProduct
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Update product error:', error);
    
    if (error.message === 'Authentication required' || error.message === 'Seller access required') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireSeller(request);
    await connectDB();

    const { id } = params;
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

    // Find the product
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if user owns this product
    if (product.seller.toString() !== user.id) {
      return NextResponse.json(
        { error: 'You can only update your own products' },
        { status: 403 }
      );
    }

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

    // Generate new slug if name changed
    let slug = product.slug;
    if (name.trim() !== product.name) {
      slug = name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');

      // Check if slug already exists
      const existingProduct = await Product.findOne({ slug, _id: { $ne: id } });
      if (existingProduct) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        slug,
        description: description.trim(),
        shortDescription: shortDescription?.trim(),
        price,
        comparePrice,
        images,
        category,
        inventory: {
          quantity: inventory?.quantity || 0,
          trackQuantity: inventory?.trackQuantity !== false,
          allowBackorder: inventory?.allowBackorder || false
        },
        dimensions,
        materials: materials?.map((m: string) => m.trim()).filter(Boolean),
        tags: tags?.map((t: string) => t.toLowerCase().trim()).filter(Boolean)
      },
      { new: true, runValidators: true }
    ).populate([
      { path: 'category', select: 'name slug' },
      { path: 'seller', select: 'name businessName' }
    ]);

    return NextResponse.json(
      {
        message: 'Product updated successfully',
        product: updatedProduct
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Update product error:', error);
    
    if (error.message === 'Authentication required' || error.message === 'Seller access required') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireSeller(request);
    await connectDB();

    const { id } = params;

    // Find the product
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if user owns this product
    if (product.seller.toString() !== user.id) {
      return NextResponse.json(
        { error: 'You can only delete your own products' },
        { status: 403 }
      );
    }

    // Delete the product
    await Product.findByIdAndDelete(id);

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Delete product error:', error);
    
    if (error.message === 'Authentication required' || error.message === 'Seller access required') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
