import { notFound } from 'next/navigation';
import { getProductsCollection, getCategoriesCollection } from '@/lib/mongodb';
import type { Product, Category } from '@/types';
import ProductDetailClient from './ProductDetailClient';

async function getProductData(id: string) {
  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return { product: null, category: null };
  }
  try {
    const productsCollection = await getProductsCollection();
    const categoriesCollection = await getCategoriesCollection();
    
    const product = await productsCollection.findOne({ id: productId });
    if (!product) {
      return { product: null, category: null };
    }

    const category = await categoriesCollection.findOne({ slug: product.category });

    return { 
      product: JSON.parse(JSON.stringify(product)) as Product,
      category: JSON.parse(JSON.stringify(category)) as Category | null,
    };
  } catch (e) {
    console.error(e);
    return { product: null, category: null };
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { product, category } = await getProductData(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} category={category} />;
}
