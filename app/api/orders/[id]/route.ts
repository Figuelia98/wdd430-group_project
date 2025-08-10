import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { requireAuth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth(request);
    await connectDB();

    const { id } = await params;
    
    const order = await Order.findById(id)
      .populate('items.product', 'name slug')
      .populate('items.seller', 'name businessName')
      .populate('buyer', 'name email');

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Check if user owns this order
    if (order.buyer._id.toString() !== user.id) {
      return NextResponse.json(
        { error: 'You can only view your own orders' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { order },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Get order error:', error);
    
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
