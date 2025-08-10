import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    let query: any = { buyer: user.id };
    
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('items.product', 'name slug')
      .populate('items.seller', 'name businessName');

    const totalOrders = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / limit);

    return NextResponse.json(
      {
        orders,
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
    console.error('Get orders error:', error);
    
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

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    await connectDB();

    const body = await request.json();
    const {
      items,
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress,
      paymentInfo
    } = body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.addressLine1 ||
        !shippingAddress.city || !shippingAddress.state || !shippingAddress.postalCode) {
      return NextResponse.json(
        { error: 'Complete shipping address is required' },
        { status: 400 }
      );
    }

    if (!paymentInfo || !paymentInfo.method) {
      return NextResponse.json(
        { error: 'Payment information is required' },
        { status: 400 }
      );
    }

    // Verify products exist and are available
    const productIds = items.map(item => item.product);
    const products = await Product.find({ 
      _id: { $in: productIds }, 
      isActive: true 
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: 'Some products are no longer available' },
        { status: 400 }
      );
    }

    // Check inventory for products that track quantity
    for (const item of items) {
      const product = products.find(p => p._id.toString() === item.product);
      if (product && product.inventory.trackQuantity) {
        if (product.inventory.quantity < item.quantity && !product.inventory.allowBackorder) {
          return NextResponse.json(
            { error: `Insufficient stock for ${product.name}` },
            { status: 400 }
          );
        }
      }
    }

    // Simulate payment processing
    let paymentStatus = 'completed';
    let transactionId = `txn_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    if (paymentInfo.method === 'paypal') {
      // In a real app, you would integrate with PayPal API here
      paymentStatus = 'completed';
    } else if (paymentInfo.method === 'credit_card') {
      // In a real app, you would integrate with Stripe or similar here
      paymentStatus = 'completed';
    }

    // Create the order
    const order = new Order({
      buyer: user.id,
      items: items.map(item => ({
        product: item.product,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        seller: item.seller
      })),
      subtotal,
      shipping,
      tax,
      total,
      status: paymentStatus === 'completed' ? 'confirmed' : 'pending',
      shippingAddress,
      paymentInfo: {
        method: paymentInfo.method,
        transactionId,
        status: paymentStatus,
        amount: total,
        currency: paymentInfo.currency || 'USD'
      }
    });

    await order.save();

    // Update product inventory
    for (const item of items) {
      const product = products.find(p => p._id.toString() === item.product);
      if (product && product.inventory.trackQuantity) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { 'inventory.quantity': -item.quantity } }
        );
      }
    }

    // Populate the order for response
    await order.populate([
      { path: 'items.product', select: 'name slug' },
      { path: 'items.seller', select: 'name businessName' },
      { path: 'buyer', select: 'name email' }
    ]);

    return NextResponse.json(
      {
        message: 'Order placed successfully',
        order
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Create order error:', error);
    
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
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
