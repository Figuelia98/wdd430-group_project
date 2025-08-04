import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { requireSeller, getUserFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const seller = await User.findById(user.id).select('-password');
    
    if (!seller) {
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { seller },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Get seller profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireSeller(request);
    await connectDB();

    const body = await request.json();
    const {
      businessName,
      businessDescription,
      businessAddress,
      businessPhone,
      businessWebsite,
      craftSpecialties,
      yearsOfExperience,
      socialMedia
    } = body;

    // Validation
    if (businessName && businessName.length > 200) {
      return NextResponse.json(
        { error: 'Business name cannot exceed 200 characters' },
        { status: 400 }
      );
    }

    if (businessDescription && businessDescription.length > 1000) {
      return NextResponse.json(
        { error: 'Business description cannot exceed 1000 characters' },
        { status: 400 }
      );
    }

    if (yearsOfExperience && (yearsOfExperience < 0 || yearsOfExperience > 100)) {
      return NextResponse.json(
        { error: 'Years of experience must be between 0 and 100' },
        { status: 400 }
      );
    }

    // Update seller profile
    const updatedSeller = await User.findByIdAndUpdate(
      user.id,
      {
        businessName: businessName?.trim(),
        businessDescription: businessDescription?.trim(),
        businessAddress: businessAddress?.trim(),
        businessPhone: businessPhone?.trim(),
        businessWebsite: businessWebsite?.trim(),
        craftSpecialties: craftSpecialties?.map((s: string) => s.trim()).filter(Boolean),
        yearsOfExperience,
        socialMedia: {
          facebook: socialMedia?.facebook?.trim(),
          instagram: socialMedia?.instagram?.trim(),
          twitter: socialMedia?.twitter?.trim()
        }
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedSeller) {
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Profile updated successfully',
        seller: updatedSeller
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Update seller profile error:', error);
    
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
