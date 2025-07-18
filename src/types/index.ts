import type { ObjectId } from 'mongodb';

export interface Review {
    _id?: ObjectId;
    id: number;
    rating: number;
    comment: string;
    author: string;
    date: string;
}

export interface Product {
  _id?: ObjectId;
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  specs: Record<string, string>;
  stock: number;
  reviews: Review[];
}

export interface Category {
  _id?: ObjectId;
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

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface SignUpData extends SignInData {
    name: string;
}
