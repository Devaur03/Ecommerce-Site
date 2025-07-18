export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  specs: Record<string, string>;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
