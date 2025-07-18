'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/hooks/useWishlist';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { Trash2, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function WishlistPage() {
  const { user, signInWithGoogle } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const handleRemove = (item: {id: number, name: string}) => {
    removeFromWishlist(item.id);
    toast({
      title: 'Removed from Wishlist',
      description: `${item.name} has been removed.`,
    })
  }
  
  if (!user) {
    return (
       <div className="container mx-auto px-4 py-8 text-center">
         <Card className="max-w-md mx-auto py-12">
           <CardContent className="flex flex-col items-center">
            <Heart className="h-20 w-20 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold">Sign in to see your wishlist</h2>
            <p className="text-muted-foreground mt-2">Your wishlist is waiting for you.</p>
            <Button onClick={signInWithGoogle} className="mt-6">
              Sign In with Google
            </Button>
           </CardContent>
         </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center font-headline text-4xl font-bold">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <Card className="text-center py-20">
          <CardContent className="flex flex-col items-center">
            <Heart className="h-20 w-20 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
            <p className="text-muted-foreground mt-2">Find something you love and add it to your wishlist.</p>
            <Button asChild className="mt-6">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
                 <Link href={`/products/${item.id}`} className="block">
                     <div className="relative h-64 w-full">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                 </Link>
                 <CardContent className="p-4">
                     <Link href={`/products/${item.id}`} className="block">
                        <h3 className="font-headline text-lg font-semibold truncate group-hover:text-primary">{item.name}</h3>
                        <p className="mt-2 text-xl font-bold text-primary">{formatPrice(item.price)}</p>
                    </Link>
                    <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => handleRemove(item)}>
                        Remove <Trash2 className="ml-2 h-4 w-4" />
                    </Button>
                 </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
