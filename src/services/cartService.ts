// src/services/cartService.ts

import { CartItem, Product } from '@/types/entity';

const CART_KEY = 'shopping_cart';

const getCart = (): CartItem[] => {
  const cartData = localStorage.getItem(CART_KEY);
  return cartData ? JSON.parse(cartData) : [];
};

const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const addToCart = (product: Product, quantity: number = 1): void => {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart(cart);
};

const removeFromCart = (productId: string): void => {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
};

const updateCartItem = (productId: string, quantity: number): void => {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);

  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart(cart);
    }
  }
};

const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};

const getCartTotal = (): number => {
  return getCart().reduce((total, item) => total + item.price * item.quantity, 0);
};

export const cartService = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  getCartTotal,
};
