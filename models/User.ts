import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Seller-specific fields
  businessName?: string;
  businessDescription?: string;
  businessAddress?: string;
  businessPhone?: string;
  businessWebsite?: string;
  craftSpecialties?: string[];
  yearsOfExperience?: number;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['buyer', 'seller'],
    default: 'buyer'
  },
  avatar: {
    type: String,
    default: null
  },
  
  // Seller-specific fields
  businessName: {
    type: String,
    trim: true,
    maxlength: [200, 'Business name cannot exceed 200 characters']
  },
  businessDescription: {
    type: String,
    trim: true,
    maxlength: [1000, 'Business description cannot exceed 1000 characters']
  },
  businessAddress: {
    type: String,
    trim: true,
    maxlength: [300, 'Business address cannot exceed 300 characters']
  },
  businessPhone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  businessWebsite: {
    type: String,
    trim: true,
    maxlength: [200, 'Website URL cannot exceed 200 characters']
  },
  craftSpecialties: [{
    type: String,
    trim: true
  }],
  yearsOfExperience: {
    type: Number,
    min: [0, 'Years of experience cannot be negative'],
    max: [100, 'Years of experience cannot exceed 100']
  },
  socialMedia: {
    facebook: {
      type: String,
      trim: true,
      maxlength: [200, 'Facebook URL cannot exceed 200 characters']
    },
    instagram: {
      type: String,
      trim: true,
      maxlength: [200, 'Instagram URL cannot exceed 200 characters']
    },
    twitter: {
      type: String,
      trim: true,
      maxlength: [200, 'Twitter URL cannot exceed 200 characters']
    }
  }
}, {
  timestamps: true
});

// Index for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
