import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { categories } from '@/lib/data';
import Link from 'next/link';
import { List } from 'lucide-react';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="pt-20">
          <h2 className="font-headline text-2xl">Categories</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/products">
                        <List />
                        <span>All Products</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            {categories.map((category) => (
              <SidebarMenuItem key={category.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/categories/${category.slug}`}>
                    <span>{category.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 md:p-8">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
