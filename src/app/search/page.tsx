
'use client';

import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useEffect, useState } from 'react';
import type { Product } from '@/types';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (query) {
            const lowercasedQuery = query.toLowerCase();
            const results = products.filter(
                (product) =>
                product.name.toLowerCase().includes(lowercasedQuery) ||
                product.description.toLowerCase().includes(lowercasedQuery) ||
                product.category.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts([]);
        }
    }, [query]);


  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Search</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      {query ? (
        <>
            <h1 className="mb-2 text-center font-headline text-4xl font-bold">
                Search Results
            </h1>
            <p className="text-center text-muted-foreground mb-8">
                {filteredProducts.length > 0 ? 
                    `Showing ${filteredProducts.length} results for ` : 
                    `No results found for `} 
                <span className="font-semibold text-foreground">"{query}"</span>
            </p>
            {filteredProducts.length > 0 && (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </>
      ) : (
         <h1 className="mb-8 text-center font-headline text-4xl font-bold">
            Please enter a search term
        </h1>
      )}
    </div>
  );
}
