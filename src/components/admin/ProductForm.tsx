
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from '@/types';
import { categories } from '@/lib/data';

type FormData = Omit<Product, 'id' | '_id' | 'reviews'>

interface ProductFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  product: Product | null;
  onSubmit: (product: FormData & { id?: number }) => void;
}

const defaultProduct: FormData = {
  name: '',
  description: '',
  price: 0,
  images: ['https://placehold.co/600x600.png'],
  category: 'sofas',
  specs: { Material: '', Dimensions: '', Color: '' },
  stock: 0,
};

export default function ProductForm({ isOpen, onOpenChange, product, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<FormData>(defaultProduct);

  useEffect(() => {
    if (isOpen) {
        if (product) {
            const { _id, id, reviews, ...editableData } = product;
            setFormData(editableData);
        } else {
            setFormData(defaultProduct);
        }
    }
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const isNumberField = name === 'price' || name === 'stock';
    setFormData((prev) => ({ ...prev, [name]: isNumberField ? parseFloat(value) || 0 : value }));
  };

  const handleSpecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, specs: { ...prev.specs, [name]: value } }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = { ...formData };
    if (product) {
        // @ts-ignore
        submissionData.id = product.id;
    }
    onSubmit(submissionData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline">{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogDescription>
            {product ? 'Update the details of this product.' : 'Fill in the details for the new product.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} className="col-span-3" required />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Select name="category" onValueChange={handleCategoryChange} value={formData.category}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">Stock</Label>
            <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">Image URL</Label>
            <Input id="image" name="image" value={formData.images[0]} onChange={(e) => setFormData(prev => ({...prev, images: [e.target.value]}))} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image2" className="text-right">Image URL 2</Label>
            <Input id="image2" name="image2" value={formData.images[1] || ''} onChange={(e) => setFormData(prev => ({...prev, images: [prev.images[0], e.target.value, prev.images[2] || '']}))} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image3" className="text-right">Image URL 3</Label>
            <Input id="image3" name="image3" value={formData.images[2] || ''} onChange={(e) => setFormData(prev => ({...prev, images: [prev.images[0], prev.images[1] || '', e.target.value]}))} className="col-span-3" />
          </div>

          <h3 className="font-headline text-lg mt-4 col-span-4">Specifications</h3>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Material" className="text-right">Material</Label>
            <Input id="Material" name="Material" value={formData.specs.Material || ''} onChange={handleSpecChange} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Dimensions" className="text-right">Dimensions</Label>
            <Input id="Dimensions" name="Dimensions" value={formData.specs.Dimensions || ''} onChange={handleSpecChange} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Color" className="text-right">Color</Label>
            <Input id="Color" name="Color" value={formData.specs.Color || ''} onChange={handleSpecChange} className="col-span-3" />
          </div>

          <DialogFooter>
            <Button type="submit">{product ? 'Save Changes' : 'Add Product'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
