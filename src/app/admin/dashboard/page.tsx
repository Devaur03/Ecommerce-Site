
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreHorizontal, PlusCircle, Trash2, Edit, LogOut } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import ProductForm from '@/components/admin/ProductForm';
import Logo from '@/components/icons/Logo';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    // Basic protection for admin route
    const isAuthenticated = localStorage.getItem('ff_admin_auth') === 'true';
    if (!isAuthenticated) {
      router.replace('/admin/login');
    } else {
        fetchProducts();
    }
  }, [router]);
    
  const fetchProducts = async () => {
      try {
          setLoading(true);
          const res = await fetch('/api/products');
          const data = await res.json();
          setProducts(data);
      } catch (error) {
          toast({ variant: 'destructive', title: 'Error fetching products', description: 'Could not load product data.' });
      } finally {
          setLoading(false);
      }
  }

  const handleLogout = () => {
    localStorage.removeItem('ff_admin_auth');
    toast({ title: "Logged out", description: "You have been successfully logged out." });
    router.push('/admin/login');
  }

  const handleAddNew = () => {
    setSelectedProduct(null);
    setFormOpen(true);
  };
  
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormOpen(true);
  };

  const confirmDelete = (product: Product) => {
    setProductToDelete(product);
    setDeleteAlertOpen(true);
  };

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        const res = await fetch(`/api/products/${productToDelete.id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete');
        
        setProducts(products.filter((p) => p.id !== productToDelete.id));
        toast({ title: "Product Deleted", description: `"${productToDelete.name}" has been removed.` });

      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete product.' });
      }
    }
    setDeleteAlertOpen(false);
    setProductToDelete(null);
  };

  const handleFormSubmit = async (productData: Omit<Product, 'id' | '_id' | 'reviews'> & { id?: number }) => {
    const isUpdating = selectedProduct !== null;
    const url = isUpdating ? `/api/products/${selectedProduct?.id}` : '/api/products';
    const method = isUpdating ? 'PUT' : 'POST';

    try {
        const res = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Something went wrong');
        }
        
        const savedProduct = await res.json();

        if (isUpdating) {
          setProducts(products.map(p => p.id === savedProduct.id ? savedProduct : p));
          toast({ title: "Product Updated", description: `"${savedProduct.name}" has been updated.` });
        } else {
          setProducts([savedProduct, ...products]);
          toast({ title: "Product Added", description: `"${savedProduct.name}" has been added.` });
        }
        
        setFormOpen(false);
        setSelectedProduct(null);

    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  }

  const renderSkeleton = () => (
      [...Array(5)].map((_, i) => (
        <TableRow key={i}>
            <TableCell className="hidden sm:table-cell"><Skeleton className="h-16 w-16 rounded-md" /></TableCell>
            <TableCell><Skeleton className="h-4 w-40" /></TableCell>
            <TableCell><Skeleton className="h-4 w-20" /></TableCell>
            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
            <TableCell><Skeleton className="h-4 w-12" /></TableCell>
            <TableCell><Skeleton className="h-8 w-8" /></TableCell>
        </TableRow>
      ))
  );

  return (
    <div className="flex min-h-screen w-full flex-col">
       <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
          <Logo />
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
       </header>
       <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle className="font-headline">Products</CardTitle>
                <CardDescription>Manage your furniture products.</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <Button size="sm" onClick={handleAddNew}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? renderSkeleton() : products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={product.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.images[0]}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{formatPrice(product.price)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(product)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => confirmDelete(product)} className="text-destructive">
                             <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
             { !loading &&
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{products.length}</strong> of <strong>{products.length}</strong> products
                </div>
            }
          </CardFooter>
        </Card>
      </main>
      
      <ProductForm 
        isOpen={isFormOpen} 
        onOpenChange={setFormOpen}
        product={selectedProduct}
        onSubmit={handleFormSubmit}
      />

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product from your store.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

