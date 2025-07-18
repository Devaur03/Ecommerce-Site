"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { WishlistItem, Product } from '@/types';
import { useAuth } from '@/hooks/useAuth';

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  wishlistCount: number;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const { user } = useAuth();

  const getStorageKey = () => user ? `wishlist_${user.uid}` : null;

  useEffect(() => {
    const storageKey = getStorageKey();
    if (storageKey) {
      const storedWishlist = localStorage.getItem(storageKey);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } else {
        setWishlist([]);
    }
  }, [user]);

  useEffect(() => {
    const storageKey = getStorageKey();
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToWishlist = (product: Product) => {
    setWishlist(prevItems => {
      if (prevItems.find(item => item.id === product.id)) {
        return prevItems;
      }
      const wishlistItem: WishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      };
      return [...prevItems, wishlistItem];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};
