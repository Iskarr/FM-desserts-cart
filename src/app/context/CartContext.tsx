"use client";
import React, { createContext, useContext, useState } from "react";

export interface Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
  quantity?: number;
}

interface CartContextType {
  cartItems: Product[];
  totalQuantity: number;
  totalAmount: number;
  handleAddToCart: (product: Product) => void;
  handleIncrement: (product: Product) => void;
  handleDecrement: (product: Product) => void;
  handleRemoveItem: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: (item.quantity ?? 0) + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleIncrement = (product: Product) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === product.name
          ? { ...item, quantity: (item.quantity ?? 0) + 1 }
          : item
      )
    );
  };

  const handleDecrement = (product: Product) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.name === product.name
            ? { ...item, quantity: (item.quantity ?? 0) - 1 }
            : item
        )
        .filter((item) => (item.quantity ?? 0) > 0)
    );
  };

  const handleRemoveItem = (product: Product) => {
    setCartItems((prev) => prev.filter((item) => item.name !== product.name));
  };

  const totalQuantity = cartItems.reduce(
    (acc, item) => acc + (item.quantity ?? 0),
    0
  );
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity ?? 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalQuantity,
        totalAmount,
        handleAddToCart,
        handleIncrement,
        handleDecrement,
        handleRemoveItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
