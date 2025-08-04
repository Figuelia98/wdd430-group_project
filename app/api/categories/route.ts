import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';
    const parentId = searchParams.get('parent');

    let query: any = {};
    
    if (!includeInactive) {
      query.isActive = true;
    }

    if (parentId) {
      query.parentCategory = parentId === 'null' ? null : parentId;
    }

    const categories = await Category.find(query)
      .populate('parentCategory', 'name slug')
      .sort({ sortOrder: 1, name: 1 });

    return NextResponse.json(
      { categories },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, description, image, parentCategory, sortOrder = 0 } = body;

    // Validation
    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'A category with this name already exists' },
        { status: 409 }
      );
    }

    // Validate parent category if provided
    if (parentCategory) {
      const parent = await Category.findById(parentCategory);
      if (!parent) {
        return NextResponse.json(
          { error: 'Parent category not found' },
          { status: 400 }
        );
      }
    }

    // Create category
    const category = new Category({
      name: name.trim(),
      slug,
      description: description?.trim(),
      image: image?.trim(),
      parentCategory: parentCategory || null,
      sortOrder
    });

    await category.save();

    // Populate parent category for response
    await category.populate('parentCategory', 'name slug');

    return NextResponse.json(
      {
        message: 'Category created successfully',
        category
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Create category error:', error);
    
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
