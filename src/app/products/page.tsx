import ProductCard from '@/components/ProductCard';
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

async function getProducts(): Promise<Product[]> {
  try {
    const productsCollection = await getProductsCollection();
    const products = await productsCollection.find({}).toArray();
    return JSON.parse(JSON.stringify(products)) as Product[];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="mb-8 text-center font-headline text-4xl font-bold">
        All Products
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id?.toString()} product={product} />
        ))}
      </div>
    </div>
  );
}
