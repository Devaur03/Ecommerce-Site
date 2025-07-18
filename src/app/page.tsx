
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';
import { getProductsCollection } from '@/lib/mongodb';
import { categories as staticCategories } from '@/lib/data';
import type { Product, Category } from '@/types';

async function getHomePageData() {
  try {
    const productsCollection = await getProductsCollection();

    // Fetch featured products
    const featuredProducts = await productsCollection.find({}).sort({ _id: -1 }).limit(4).toArray();

    // Dynamically get categories from products in the database
    const productCategories = await productsCollection.distinct('category');
    
    // Map the dynamic category slugs to the full static category data (for images, names)
    const categories = staticCategories
      .filter(cat => productCategories.includes(cat.slug))
      .slice(0, 4); // Limit to 4 categories on the homepage

    return {
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts)) as Product[],
      categories: JSON.parse(JSON.stringify(categories)) as Category[],
    };
  } catch (e) {
    console.error(e);
    return { featuredProducts: [], categories: [] };
  }
}

export default async function Home() {
  const { featuredProducts, categories } = await getHomePageData();

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1600&h=900&auto=format&fit=crop"
          alt="Stylish living room with modern furniture"
          data-ai-hint="furniture store"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-5xl font-bold md:text-7xl">
            Design Your Perfect Space
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
            Discover our exclusive collection of furniture, crafted to bring
            comfort and style to your home.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {categories.length > 0 && (
        <section id="categories" className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-headline text-4xl font-bold">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      <section className="bg-secondary/50 py-12 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-headline text-4xl font-bold">
            Featured Products
          </h2>
           {featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id?.toString()} product={product} />
                ))}
              </div>
              <div className="mt-12 text-center">
                <Button asChild variant="outline">
                  <Link href="/products">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </>
           ) : (
            <p className="text-center text-muted-foreground">No featured products yet. Add some from the admin panel!</p>
           )}
        </div>
      </section>
    </div>
  );
}
