import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { requireSeller } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await requireSeller(request);
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');

    // Build query to find orders containing items from this seller
    let query: any = {
      'items.seller': user.id
    };
    
    if (status && status !== 'all') {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    // Get orders that contain items from this seller
    const orders = await Order.find(query)
      .populate('buyer', 'name email')
      .populate('items.product', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Filter items to only show items from this seller
    const filteredOrders = orders.map(order => {
      const sellerItems = order.items.filter(item => 
        item.seller.toString() === user.id
      );
      
      // Calculate totals for seller's items only
      const sellerSubtotal = sellerItems.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
      
      return {
        ...order.toObject(),
        items: sellerItems,
        sellerSubtotal,
        // Keep original totals for reference
        originalTotal: order.total
      };
    });

    const totalOrders = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / limit);

    return NextResponse.json(
      {
        orders: filteredOrders,
        pagination: {
          currentPage: page,
          totalPages,
          totalOrders,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Get seller orders error:', error);
    
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
