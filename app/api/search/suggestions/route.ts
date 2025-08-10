import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query || query.length < 2) {
      return NextResponse.json(
        { suggestions: [] },
        { status: 200 }
      );
    }

    const searchRegex = new RegExp(query, 'i');
    
    // Get product name suggestions
    const productSuggestions = await Product.find({
      isActive: true,
      name: { $regex: searchRegex }
    })
    .select('name')
    .limit(5)
    .lean();

    // Get category suggestions
    const categorySuggestions = await Category.find({
      isActive: true,
      name: { $regex: searchRegex }
    })
    .select('name slug')
    .limit(3)
    .lean();

    // Get tag suggestions
    const tagSuggestions = await Product.aggregate([
      {
        $match: {
          isActive: true,
          tags: { $regex: searchRegex }
        }
      },
      {
        $unwind: '$tags'
      },
      {
        $match: {
          tags: { $regex: searchRegex }
        }
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 3
      }
    ]);

    const suggestions = {
      products: productSuggestions.map(p => ({
        type: 'product',
        text: p.name,
        value: p.name
      })),
      categories: categorySuggestions.map(c => ({
        type: 'category',
        text: c.name,
        value: c.slug
      })),
      tags: tagSuggestions.map(t => ({
        type: 'tag',
        text: t._id,
        value: t._id
      }))
    };

    return NextResponse.json(
      { suggestions },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Search suggestions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
