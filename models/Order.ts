import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  seller: string;
}

export interface IShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface IPaymentInfo {
  method: 'credit_card' | 'paypal' | 'stripe';
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  amount: number;
  currency: string;
}

export interface IOrder extends Document {
  _id: string;
  orderNumber: string;
  buyer: string;
  items: IOrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: IShippingAddress;
  paymentInfo: IPaymentInfo;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: {
    type: String,
    required: true
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const ShippingAddressSchema = new Schema<IShippingAddress>({
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  addressLine1: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  addressLine2: {
    type: String,
    trim: true,
    maxlength: 200
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  state: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  postalCode: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  country: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    default: 'United States'
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  }
});

const PaymentInfoSchema = new Schema<IPaymentInfo>({
  method: {
    type: String,
    enum: ['credit_card', 'paypal', 'stripe'],
    required: true
  },
  transactionId: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    required: true,
    default: 'USD',
    uppercase: true
  }
});

const OrderSchema = new Schema<IOrder>({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [OrderItemSchema],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  shipping: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  tax: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    type: ShippingAddressSchema,
    required: true
  },
  paymentInfo: {
    type: PaymentInfoSchema,
    required: true
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  },
  trackingNumber: {
    type: String,
    trim: true,
    maxlength: 100
  },
  estimatedDelivery: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
OrderSchema.index({ buyer: 1, createdAt: -1 });
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ 'items.seller': 1, createdAt: -1 });

// Order number is generated in the API before saving

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
