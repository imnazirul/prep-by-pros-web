'use client';

import {
  AddToCartRequest,
  CartItem as ApiCartItem,
  useAddToCartMutation,
  useDeleteCartItemMutation,
  useGetCartItemsQuery,
  useUpdateCartItemMutation,
} from '@/redux/api/authApi';
import { createContext, ReactNode, useContext, useState } from 'react';

// UI Cart Item shape
export type CartItem = {
  id: string; // Cart Item UID
  name: string;
  price: number;
  quantity: number;
  image?: string;
  productUid: string; // Keep ref to product
  color?: string;
  colorCode?: string;
  size?: string;
  style?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: AddToCartRequest) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  increaseQuantity: (id: string) => Promise<void>;
  decreaseQuantity: (id: string) => Promise<void>;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setCartOpen] = useState(false);

  const { data: cartData, isLoading } = useGetCartItemsQuery({});
  const [addToCart] = useAddToCartMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const items: CartItem[] =
    cartData?.results?.map((item: ApiCartItem) => ({
      id: item.uid,
      name: item.product.title,
      price: parseFloat(item.product.price),
      quantity: item.product_count,
      image: item.product.file_items?.[0]?.file || '/images/placeholder.png',
      productUid: item.product.uid,
      color: item.colour?.title,
      colorCode: item.colour?.code,
      size: item.size?.title,
      style: item.style?.title,
    })) || [];

  const addItem = async (request: AddToCartRequest) => {
    try {
      await addToCart(request).unwrap();
      // setCartOpen(true);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await deleteCartItem(id).unwrap();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const clearCart = async () => {
    // Parallel deletion of all items
    try {
      await Promise.all(items.map((item) => deleteCartItem(item.id).unwrap()));
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);
  const toggleCart = () => setCartOpen((prev) => !prev);

  const increaseQuantity = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      try {
        await updateCartItem({ uid: id, body: { product_count: item.quantity + 1 } }).unwrap();
      } catch (error) {
        console.error('Failed to update quantity:', error);
      }
    }
  };

  const decreaseQuantity = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item && item.quantity > 1) {
      try {
        await updateCartItem({ uid: id, body: { product_count: item.quantity - 1 } }).unwrap();
      } catch (error) {
        console.error('Failed to update quantity:', error);
      }
    } else if (item && item.quantity === 1) {
      removeItem(id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        decreaseQuantity,
        increaseQuantity,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
