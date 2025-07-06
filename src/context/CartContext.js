import React, { createContext, useContext, useState } from 'react';

// 1) 创建 Context
const CartContext = createContext();

// 2) 命名导出 CartProvider
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon]       = useState('');

  const addToCart = item => {
    setCartItems(prev => {
      const idx = prev.findIndex(p => p.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].qty += 1;
        return copy;
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const clearCart   = () => setCartItems([]);
  const applyCoupon = code => setCoupon(code.trim());

  return (
    <CartContext.Provider value={{
      cartItems,
      coupon,
      addToCart,
      clearCart,
      applyCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
}

// 3) 命名导出 useCart
export function useCart() {
  return useContext(CartContext);
}
