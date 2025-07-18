import { products, categories } from '@/lib/data';
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

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find(c => c.slug === params.slug);
  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.category === params.slug
  );

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
            <ProductCard key={product.id} product={product} />
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
