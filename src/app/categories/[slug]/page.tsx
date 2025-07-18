import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getProductsCollection } from '@/lib/mongodb';
import type { Product } from '@/types';
import { categories } from '@/lib/data';

async function getCategoryProducts(slug: string) {
  try {
    const productsCollection = await getProductsCollection();
    const products = await productsCollection.find({ category: { $regex: new RegExp(`^${slug}$`, 'i') } }).toArray();

    return JSON.parse(JSON.stringify(products)) as Product[];
  } catch (e) {
    console.error(e);
    return [];
  }
}

// Helper to get category name from static data, since we don't have a categories collection
function getCategoryName(slug: string): string {
    const category = categories.find(c => c.slug.toLowerCase() === slug.toLowerCase());
    // Capitalize first letter
    return category ? category.name : slug.charAt(0).toUpperCase() + slug.slice(1);
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryProducts = await getCategoryProducts(params.slug);
  const categoryName = getCategoryName(params.slug);

  if (categoryProducts.length === 0) {
     // We show the page even if there are no products, to avoid a 404.
     // The user might not have added products to this category yet.
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{categoryName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="mb-8 text-center font-headline text-4xl font-bold">
        {categoryName}
      </h1>
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product._id?.toString()} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No products found in this category yet.
        </p>
      )}
    </div>
  );
}
