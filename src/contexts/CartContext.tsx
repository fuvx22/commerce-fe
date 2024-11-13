// src/contexts/CartContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '@/types/entity';
import { cartService } from '@/services/cartService';

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(cartService.getCart());
  }, []);

  const add = (product: Product, quantity: number = 1) => {
    cartService.addToCart(product, quantity);
    setCart([...cartService.getCart()]);
  };

  const remove = (productId: string) => {
    cartService.removeFromCart(productId);
    setCart([...cartService.getCart()]);
  };

  const update = (productId: string, quantity: number) => {
    cartService.updateCartItem(productId, quantity);
    setCart([...cartService.getCart()]);
  };

  const clear = () => {
    cartService.clearCart();
    setCart([]);
  };

  const getTotal = () => {
    return cartService.getCartTotal();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart: add, removeFromCart: remove, updateCartItem: update, clearCart: clear, getCartTotal: getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart phải được sử dụng bên trong CartProvider');
  }
  return context;
};
