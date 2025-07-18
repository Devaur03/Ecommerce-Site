
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
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import type { Product } from '@/types';
import { categories } from '@/lib/data';
import { Upload } from 'lucide-react';

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
  images: ['', '', ''],
  category: 'sofas',
  specs: { Material: '', Dimensions: '', Color: '' },
  stock: 0,
};

export default function ProductForm({ isOpen, onOpenChange, product, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<FormData>(defaultProduct);
  const [uploadProgress, setUploadProgress] = useState<(number | null)[]>([null, null, null]);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
        if (product) {
            const { _id, id, reviews, ...editableData } = product;
            // Ensure images array has 3 elements for the form
            const images = [...(editableData.images || []), '', ''].slice(0, 3);
            setFormData({ ...editableData, images });
        } else {
            setFormData(defaultProduct);
        }
        setUploadProgress([null, null, null]);
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
  
  const handleImageChange = (index: number, value: string) => {
    setFormData(prev => {
        const newImages = [...prev.images];
        newImages[index] = value;
        return {...prev, images: newImages};
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleImageUpload = (index: number, file: File) => {
    if (!file) return;

    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    setUploadProgress(prev => {
        const newProgress = [...(prev || [null, null, null])];
        newProgress[index] = 0;
        return newProgress;
    });

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         setUploadProgress(prev => {
            const newProgress = [...(prev || [null, null, null])];
            newProgress[index] = progress;
            return newProgress;
        });
      }, 
      (error) => {
        toast({ variant: "destructive", title: "Upload Failed", description: error.message });
        setUploadProgress(prev => {
            const newProgress = [...(prev || [null, null, null])];
            newProgress[index] = null;
            return newProgress;
        });
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          handleImageChange(index, downloadURL);
          toast({ title: "Upload Complete", description: `Image ${index + 1} has been uploaded.` });
           setUploadProgress(prev => {
            const newProgress = [...(prev || [null, null, null])];
            newProgress[index] = null;
            return newProgress;
        });
        });
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = { ...formData, images: formData.images.filter(img => img !== '') };
    if (product) {
        // @ts-ignore
        submissionData.id = product.id;
    }
    onSubmit(submissionData);
  };
  
  const renderImageInput = (index: number) => (
    <div key={index} className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`image${index}`} className="text-right">
            Image URL {index + 1}
        </Label>
        <div className="col-span-3 space-y-2">
            <div className="flex gap-2">
                <Input
                    id={`image${index}`}
                    value={formData.images[index] || ''}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="flex-grow"
                    placeholder="https://... or upload"
                />
                <Button asChild variant="outline" size="icon" className="relative shrink-0">
                    <label htmlFor={`file-upload-${index}`}>
                        <Upload className="h-4 w-4" />
                        <input id={`file-upload-${index}`} type="file" className="sr-only" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(index, e.target.files[0])} />
                    </label>
                </Button>
            </div>
            {uploadProgress?.[index] !== null && <Progress value={uploadProgress[index]} className="h-2" />}
        </div>
    </div>
  )

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
          
          <h3 className="font-headline text-lg mt-4 col-span-4">Images</h3>
          {renderImageInput(0)}
          {renderImageInput(1)}
          {renderImageInput(2)}

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
