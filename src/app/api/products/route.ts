import { NextResponse } from 'next/server';
import { getProductsCollection } from '@/lib/mongodb';

export async function GET() {
  try {
    const productsCollection = await getProductsCollection();
    const products = await productsCollection.find({}).toArray();
    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to fetch products' }, { status: 500 });
  }
}
