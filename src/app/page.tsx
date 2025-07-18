import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categories, products } from '@/lib/data';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Stylish living room with modern furniture"
          data-ai-hint="modern living room"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
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
      
      <section className="bg-card py-12 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-headline text-4xl font-bold">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/products">View All Products <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
