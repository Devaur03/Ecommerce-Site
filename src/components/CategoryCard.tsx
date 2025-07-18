import Link from 'next/link';
import Image from 'next/image';
import type { Category } from '@/types';
import { Card } from '@/components/ui/card';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <Card className="overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-xl">
        <div className="relative h-64 w-full">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="furniture category"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative flex h-full items-center justify-center">
            <h3 className="font-headline text-2xl font-bold text-white">
              {category.name}
            </h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}
