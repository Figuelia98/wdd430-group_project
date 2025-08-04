import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Product from '@/models/Product';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;

    // Get seller profile
    const seller = await User.findById(id)
      .select('-password -email')
      .where('role').equals('seller');
    
    if (!seller) {
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }

    // Get seller's products
    const products = await Product.find({ 
      seller: id, 
      isActive: true 
    })
    .populate('category', 'name slug')
    .select('name slug shortDescription price images averageRating totalReviews')
    .sort({ createdAt: -1 })
    .limit(12);

    // Calculate seller stats
    const totalProducts = await Product.countDocuments({ 
      seller: id, 
      isActive: true 
    });

    const avgRating = products.length > 0 
      ? products.reduce((sum, product) => sum + product.averageRating, 0) / products.length
      : 0;

    const totalReviews = products.reduce((sum, product) => sum + product.totalReviews, 0);

    return NextResponse.json(
      {
        seller: {
          ...seller.toObject(),
          stats: {
            totalProducts,
            averageRating: Math.round(avgRating * 10) / 10,
            totalReviews
          }
        },
        products
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Get seller error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
