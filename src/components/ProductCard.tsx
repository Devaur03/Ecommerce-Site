import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Use a placeholder if images array is missing, empty, or the first image URL is an empty string.
  const imageUrl = product.images && product.images.length > 0 && product.images[0]
    ? product.images[0]
    : 'https://placehold.co/600x600.png';

  return (
    <Card className="group overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <CardContent className="p-0">
          <div className="relative h-64 w-full">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="furniture product"
            />
          </div>
          <div className="p-4">
            <h3 className="font-headline text-lg font-semibold truncate">{product.name}</h3>
            <p className="mt-2 text-xl font-bold text-primary">{formatPrice(product.price)}</p>
            <Button variant="outline" size="sm" className="mt-4 w-full">
                View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
