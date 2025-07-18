'use client';

import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useEffect, useState, Suspense } from 'react';
import type { Product } from '@/types';

function SearchComponent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            if (query) {
                setLoading(true);
                try {
                    // In a real app with many products, this search would be a database query.
                    // For now, we fetch all products and filter client-side.
                    const res = await fetch('/api/products');
                    const allProducts: Product[] = await res.json();
                    
                    const lowercasedQuery = query.toLowerCase();
                    const results = allProducts.filter(
                        (product) =>
                        product.name.toLowerCase().includes(lowercasedQuery) ||
                        product.description.toLowerCase().includes(lowercasedQuery) ||
                        product.category.toLowerCase().includes(lowercasedQuery)
                    );
                    setFilteredProducts(results);
                } catch (error) {
                    console.error("Failed to fetch products for search", error);
                    setFilteredProducts([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setFilteredProducts([]);
                setLoading(false);
            }
        }
        fetchProducts();
    }, [query]);

    return (
        <>
            {query ? (
                <>
                    <h1 className="mb-2 text-center font-headline text-4xl font-bold">
                        Search Results
                    </h1>
                    <p className="text-center text-muted-foreground mb-8">
                        {loading ? 'Searching...' : 
                         filteredProducts.length > 0 ? 
                            `Showing ${filteredProducts.length} results for ` : 
                            `No results found for `} 
                        {!loading && <span className="font-semibold text-foreground">"{query}"</span>}
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
        </>
    );
}

export default function SearchPage() {
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
      <Suspense fallback={<div>Loading search results...</div>}>
          <SearchComponent />
      </Suspense>
    </div>
  );
}
