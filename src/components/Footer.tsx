import Logo from '@/components/icons/Logo';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Crafting comfort and style for your home.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/categories/sofas" className="text-sm text-muted-foreground hover:text-primary">Sofas</Link></li>
              <li><Link href="/categories/chairs" className="text-sm text-muted-foreground hover:text-primary">Chairs</Link></li>
              <li><Link href="/categories/tables" className="text-sm text-muted-foreground hover:text-primary">Tables</Link></li>
              <li><Link href="/categories/beds" className="text-sm text-muted-foreground hover:text-primary">Beds</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">About</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FurnishFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
