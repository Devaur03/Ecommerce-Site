'use client';

import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Order Placed!',
      description: 'Thank you for your purchase. Your order is being processed.',
    });
    clearCart();
    router.push('/');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center font-headline text-4xl font-bold">Checkout</h1>
      <form onSubmit={handleCheckout} className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" required />
              </div>
              <div>
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="John" required />
              </div>
              <div>
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Doe" required />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="1234 Main St" required />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Anytown" required />
              </div>
              <div>
                <Label htmlFor="state">State / Province</Label>
                <Input id="state" placeholder="CA" required />
              </div>
              <div>
                <Label htmlFor="zip">ZIP / Postal Code</Label>
                <Input id="zip" placeholder="12345" required />
              </div>
               <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="USA" required />
              </div>
            </CardContent>
          </Card>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="font-headline">Payment Information</CardTitle>
              <CardDescription>All transactions are secure and encrypted.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                <Label htmlFor="card-number">Card Number</Label>
                <div className="relative">
                  <Input id="card-number" placeholder="**** **** **** 1234" required />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                 <div>
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input id="expiry-date" placeholder="MM / YY" required />
                </div>
                 <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                       <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{item.quantity}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Price: {formatPrice(item.price)}</p>
                      </div>
                    </div>
                    <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" size="lg">Place Order</Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
