import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
import Product from '@/models/Product';
import { requireAuth, getUserFromToken } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort') || 'newest';

    // Verify product exists
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    let sortQuery: any = {};
    switch (sort) {
      case 'oldest':
        sortQuery = { createdAt: 1 };
        break;
      case 'rating-high':
        sortQuery = { rating: -1, createdAt: -1 };
        break;
      case 'rating-low':
        sortQuery = { rating: 1, createdAt: -1 };
        break;
      case 'helpful':
        sortQuery = { helpfulVotes: -1, createdAt: -1 };
        break;
      case 'newest':
      default:
        sortQuery = { createdAt: -1 };
        break;
    }

    const skip = (page - 1) * limit;

    // Get reviews
    const reviews = await Review.find({ 
      product: id, 
      isApproved: true 
    })
    .populate('user', 'name avatar')
    .sort(sortQuery)
    .skip(skip)
    .limit(limit);

    // Get total count
    const totalReviews = await Review.countDocuments({ 
      product: id, 
      isApproved: true 
    });

    // Get rating distribution
    const ratingDistribution = await Review.aggregate([
      { $match: { product: product._id, isApproved: true } },
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ]);

    const distribution = [5, 4, 3, 2, 1].map(rating => {
      const found = ratingDistribution.find(r => r._id === rating);
      return {
        rating,
        count: found ? found.count : 0,
        percentage: totalReviews > 0 ? Math.round((found?.count || 0) / totalReviews * 100) : 0
      };
    });

    const totalPages = Math.ceil(totalReviews / limit);

    return NextResponse.json(
      {
        reviews,
        pagination: {
          currentPage: page,
          totalPages,
          totalReviews,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        ratingDistribution: distribution,
        averageRating: product.averageRating
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Get reviews error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth(request);
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { rating, title, comment, images } = body;

    // Validation
    if (!rating || !comment) {
      return NextResponse.json(
        { error: 'Rating and comment are required' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Verify product exists
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ 
      product: id, 
      user: user.id 
    });

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this product' },
        { status: 409 }
      );
    }

    // Create review
    const review = new Review({
      product: id,
      user: user.id,
      rating,
      title: title?.trim(),
      comment: comment.trim(),
      images: images || []
    });

    await review.save();

    // Update product rating statistics
    await updateProductRating(id);

    // Populate user for response
    await review.populate('user', 'name avatar');

    return NextResponse.json(
      {
        message: 'Review submitted successfully',
        review
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Create review error:', error);
    
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

// Helper function to update product rating
async function updateProductRating(productId: string) {
  const stats = await Review.aggregate([
    { $match: { product: productId, isApproved: true } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  const { averageRating = 0, totalReviews = 0 } = stats[0] || {};

  await Product.findByIdAndUpdate(productId, {
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews
  });
}
