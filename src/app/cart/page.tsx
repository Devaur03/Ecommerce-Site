'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center font-headline text-4xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <Card className="text-center py-20">
          <CardContent className="flex flex-col items-center">
            <ShoppingBag className="h-20 w-20 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground mt-2">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-6">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y divide-border">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center gap-4 p-4">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <Link href={`/products/${item.id}`} className="font-semibold hover:text-primary">
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="h-10 w-16 text-center"
                        />
                      </div>
                      <p className="w-24 text-right font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
