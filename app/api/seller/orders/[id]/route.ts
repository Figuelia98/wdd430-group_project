import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { requireSeller } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireSeller(request);
    await connectDB();
    
    const { id } = await params;
    
    const order = await Order.findById(id)
      .populate('buyer', 'name email')
      .populate('items.product', 'name slug')
      .populate('items.seller', 'name businessName');

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Check if this seller has items in this order
    const hasSellerItems = order.items.some(item => 
      item.seller._id.toString() === user.id
    );

    if (!hasSellerItems) {
      return NextResponse.json(
        { error: 'You can only view orders containing your products' },
        { status: 403 }
      );
    }

    // Filter to show only this seller's items
    const sellerItems = order.items.filter(item => 
      item.seller._id.toString() === user.id
    );

    const sellerSubtotal = sellerItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );

    const orderData = {
      ...order.toObject(),
      items: sellerItems,
      sellerSubtotal
    };

    return NextResponse.json(
      { order: orderData },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Get seller order error:', error);
    
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireSeller(request);
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { status, trackingNumber, estimatedDelivery, notes } = body;

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Check if this seller has items in this order
    const hasSellerItems = order.items.some(item => 
      item.seller.toString() === user.id
    );

    if (!hasSellerItems) {
      return NextResponse.json(
        { error: 'You can only update orders containing your products' },
        { status: 403 }
      );
    }

    // Validate status transitions
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Update order
    const updateData: any = {};
    if (status) updateData.status = status;
    if (trackingNumber) updateData.trackingNumber = trackingNumber;
    if (estimatedDelivery) updateData.estimatedDelivery = new Date(estimatedDelivery);
    if (notes) updateData.notes = notes;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate([
      { path: 'buyer', select: 'name email' },
      { path: 'items.product', select: 'name slug' },
      { path: 'items.seller', select: 'name businessName' }
    ]);

    return NextResponse.json(
      {
        message: 'Order updated successfully',
        order: updatedOrder
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Update seller order error:', error);
    
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
