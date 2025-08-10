import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Find a seller user (or create one)
    let seller = await User.findOne({ role: 'seller' });
    
    if (!seller) {
      // Create a test seller if none exists
      seller = new User({
        name: 'Test Seller',
        email: 'seller@example.com',
        password: 'hashedpassword', // In real app, this would be properly hashed
        role: 'seller',
        businessName: 'Artisan Crafts Co.',
        businessDescription: 'Handcrafted items made with love and care'
      });
      await seller.save();
    }

    // Find or create a category
    let category = await Category.findOne({ name: 'Handmade' });
    
    if (!category) {
      category = new Category({
        name: 'Handmade',
        slug: 'handmade',
        description: 'Handcrafted items',
        isActive: true
      });
      await category.save();
    }

    // Create test products
    const testProducts = [
      {
        name: 'Handwoven Scarf',
        slug: 'handwoven-scarf',
        description: 'Beautiful handwoven scarf made from organic cotton. Perfect for any season.',
        shortDescription: 'Organic cotton handwoven scarf',
        price: 45.00,
        comparePrice: 60.00,
        images: ['/placeholder-image.jpg'],
        category: category._id,
        seller: seller._id,
        inventory: {
          quantity: 10,
          trackQuantity: true,
          allowBackorder: false
        },
        materials: ['Organic Cotton', 'Natural Dyes'],
        tags: ['handmade', 'scarf', 'organic', 'cotton'],
        isActive: true,
        isFeatured: true
      },
      {
        name: 'Ceramic Coffee Mug',
        slug: 'ceramic-coffee-mug',
        description: 'Hand-thrown ceramic coffee mug with unique glaze. Each piece is one-of-a-kind.',
        shortDescription: 'Hand-thrown ceramic mug',
        price: 25.00,
        images: ['/placeholder-image.jpg'],
        category: category._id,
        seller: seller._id,
        inventory: {
          quantity: 15,
          trackQuantity: true,
          allowBackorder: true
        },
        materials: ['Ceramic', 'Glaze'],
        tags: ['handmade', 'ceramic', 'mug', 'coffee'],
        isActive: true,
        isFeatured: false
      },
      {
        name: 'Wooden Jewelry Box',
        slug: 'wooden-jewelry-box',
        description: 'Handcrafted wooden jewelry box with velvet lining. Perfect for storing your precious items.',
        shortDescription: 'Handcrafted wooden jewelry box',
        price: 85.00,
        images: ['/placeholder-image.jpg'],
        category: category._id,
        seller: seller._id,
        inventory: {
          quantity: 5,
          trackQuantity: true,
          allowBackorder: false
        },
        materials: ['Oak Wood', 'Velvet', 'Brass Hardware'],
        tags: ['handmade', 'wood', 'jewelry', 'storage'],
        isActive: true,
        isFeatured: true
      }
    ];

    // Check if products already exist
    const existingProducts = await Product.find({
      slug: { $in: testProducts.map(p => p.slug) }
    });

    const existingSlugs = existingProducts.map(p => p.slug);
    const newProducts = testProducts.filter(p => !existingSlugs.includes(p.slug));

    if (newProducts.length === 0) {
      return NextResponse.json(
        {
          message: 'Test products already exist',
          existingCount: existingProducts.length
        },
        { status: 200 }
      );
    }

    // Create new products
    const createdProducts = await Product.insertMany(newProducts);

    return NextResponse.json(
      {
        message: `Successfully created ${createdProducts.length} test products`,
        createdProducts: createdProducts.length,
        seller: {
          id: seller._id,
          name: seller.name,
          email: seller.email,
          role: seller.role
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Create test products error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
