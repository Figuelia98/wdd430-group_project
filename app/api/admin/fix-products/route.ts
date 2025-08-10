import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Find products that don't have inventory field or have incomplete inventory
    const productsToFix = await Product.find({
      $or: [
        { inventory: { $exists: false } },
        { 'inventory.trackQuantity': { $exists: false } },
        { 'inventory.quantity': { $exists: false } },
        { 'inventory.allowBackorder': { $exists: false } }
      ]
    });

    console.log(`Found ${productsToFix.length} products to fix`);

    // Update each product with default inventory values
    const updatePromises = productsToFix.map(product => {
      const updateData: any = {};
      
      if (!product.inventory) {
        updateData.inventory = {
          quantity: 0,
          trackQuantity: true,
          allowBackorder: false
        };
      } else {
        if (product.inventory.trackQuantity === undefined) {
          updateData['inventory.trackQuantity'] = true;
        }
        if (product.inventory.quantity === undefined) {
          updateData['inventory.quantity'] = 0;
        }
        if (product.inventory.allowBackorder === undefined) {
          updateData['inventory.allowBackorder'] = false;
        }
      }

      return Product.findByIdAndUpdate(product._id, updateData);
    });

    await Promise.all(updatePromises);

    return NextResponse.json(
      {
        message: `Successfully fixed ${productsToFix.length} products`,
        fixedProducts: productsToFix.length
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Fix products error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
