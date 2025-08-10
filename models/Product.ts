import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  seller: string;
  inventory: {
    quantity: number;
    trackQuantity: boolean;
    allowBackorder: boolean;
  };
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
  };
  materials?: string[];
  tags?: string[];
  isActive: boolean;
  isFeatured: boolean;
  averageRating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [2000, 'Product description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  comparePrice: {
    type: Number,
    min: [0, 'Compare price cannot be negative']
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Product seller is required']
  },
  inventory: {
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative'],
      default: 0
    },
    trackQuantity: {
      type: Boolean,
      default: true
    },
    allowBackorder: {
      type: Boolean,
      default: false
    }
  },
  dimensions: {
    length: {
      type: Number,
      min: [0, 'Length cannot be negative']
    },
    width: {
      type: Number,
      min: [0, 'Width cannot be negative']
    },
    height: {
      type: Number,
      min: [0, 'Height cannot be negative']
    },
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative']
    }
  },
  materials: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  averageRating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  totalReviews: {
    type: Number,
    default: 0,
    min: [0, 'Total reviews cannot be negative']
  }
}, {
  timestamps: true
});

// Indexes for better query performance (slug index is created by unique: true)
ProductSchema.index({ category: 1 });
ProductSchema.index({ seller: 1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ averageRating: -1 });
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ price: 1 });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
