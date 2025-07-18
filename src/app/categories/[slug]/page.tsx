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
import { getCategoriesCollection, getProductsCollection } from '@/lib/mongodb';
import type { Product, Category } from '@/types';

async function getCategoryData(slug: string) {
  try {
    const categoriesCollection = await getCategoriesCollection();
    const productsCollection = await getProductsCollection();

    const category = await categoriesCollection.findOne({ slug: slug });
    if (!category) {
      return { category: null, products: [] };
    }

    const products = await productsCollection.find({ category: { $regex: new RegExp(`^${slug}$`, 'i') } }).toArray();

    return {
      category: JSON.parse(JSON.stringify(category)) as Category,
      products: JSON.parse(JSON.stringify(products)) as Product[],
    };
  } catch (e) {
    console.error(e);
    return { category: null, products: [] };
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { category, products: categoryProducts } = await getCategoryData(params.slug);

  if (!category) {
    notFound();
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
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="mb-8 text-center font-headline text-4xl font-bold">
        {category.name}
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
