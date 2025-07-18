import { NextResponse } from 'next/server';
import { getProductsCollection } from '@/lib/mongodb';
import type { Product } from '@/types';

export async function GET() {
  try {
    const productsCollection = await getProductsCollection();
    // Sort by _id descending to get newest products first
    const products = await productsCollection.find({}).sort({ _id: -1 }).toArray();
    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to fetch products' }, { status: 500 });
  }
}


export async function POST(request: Request) {
    try {
        const productData = await request.json();
        const productsCollection = await getProductsCollection();

        // Find the highest existing ID to increment it
        const lastProduct = await productsCollection.findOne({}, { sort: { id: -1 } });
        const newId = lastProduct ? lastProduct.id + 1 : 1;

        const newProduct: Omit<Product, '_id'> = {
            id: newId,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            images: productData.images,
            category: productData.category,
            specs: productData.specs,
            stock: productData.stock,
            reviews: [], // Initialize with empty reviews
        };
        
        const result = await productsCollection.insertOne(newProduct);
        const insertedProduct = { ...newProduct, _id: result.insertedId };

        return NextResponse.json(insertedProduct, { status: 201 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Unable to create product' }, { status: 500 });
    }
}
