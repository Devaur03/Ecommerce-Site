
import { NextResponse } from 'next/server';
import { getProductsCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const productId = parseInt(params.id, 10);
    if (isNaN(productId)) {
        return NextResponse.json({ error: 'Invalid product ID format' }, { status: 400 });
    }

    const productData = await request.json();
    const { _id, id, ...updateData } = productData; // Exclude _id and id from the update payload
    
    const productsCollection = await getProductsCollection();
    
    const result = await productsCollection.findOneAndUpdate(
      { id: productId },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(result);

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const productId = parseInt(params.id, 10);
        if (isNaN(productId)) {
            return NextResponse.json({ error: 'Invalid product ID format' }, { status: 400 });
        }
        
        const productsCollection = await getProductsCollection();
        
        const result = await productsCollection.deleteOne({ id: productId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Unable to delete product' }, { status: 500 });
    }
}
