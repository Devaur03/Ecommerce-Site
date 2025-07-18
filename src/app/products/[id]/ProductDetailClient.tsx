'use client';

import { useState } from 'react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Sparkles, Heart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import RoomVisualizerDialog from '@/components/RoomVisualizerDialog';
import ReviewsSection from '@/components/ReviewsSection';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';
import type { Product, Category } from '@/types';

interface ProductDetailClientProps {
  product: Product;
  category: Category | null;
}

export default function ProductDetailClient({ product, category }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [isVisualizerOpen, setVisualizerOpen] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      variant: "success",
      title: "Added to cart!",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Please sign in',
        description: 'You need to be signed in to add items to your wishlist.',
      });
      return;
    }
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast({
        title: 'Removed from wishlist',
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: 'Added to wishlist!',
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/categories/${category.slug}`}>{category.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="relative mb-4 h-96 w-full overflow-hidden rounded-lg">
            <Image
              src={product.images[mainImage]}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint="furniture product"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((img, index) => (
              <button key={index} onClick={() => setMainImage(index)} className={`relative h-20 w-20 overflow-hidden rounded-md border-2 ${mainImage === index ? 'border-primary' : 'border-transparent'}`}>
                <Image src={img} alt={`${product.name} thumbnail ${index + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="font-headline text-4xl font-bold">{product.name}</h1>
          <p className="mt-4 text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          
          <Separator className="my-6" />

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-md border">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="outline" size="icon" onClick={handleWishlistToggle} title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}>
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-destructive text-destructive' : ''}`} />
            </Button>
          </div>

          <Button variant="outline" className="mt-4" onClick={() => setVisualizerOpen(true)}>
             <Sparkles className="mr-2 h-4 w-4" /> Visualize in Your Room
          </Button>

          <div className="mt-8">
            <h2 className="font-headline text-2xl font-semibold">Specifications</h2>
            <ul className="mt-4 space-y-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span className="font-semibold text-muted-foreground">{key}:</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
       <Separator className="my-12" />
      <ReviewsSection productId={product.id} reviews={product.reviews} />
      <RoomVisualizerDialog open={isVisualizerOpen} onOpenChange={setVisualizerOpen} product={product} />
    </div>
  );
}
