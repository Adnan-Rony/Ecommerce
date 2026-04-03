import React, { createContext, useContext, useState, useEffect } from 'react';
import { getGuestId } from '../utils/guestSession.js';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    getGuestId(); // ensure guestId exists
    const storedCart = localStorage.getItem('guestCart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const saveCart = (newCart) => {
    localStorage.setItem('guestCart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item._id === product._id);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }
      localStorage.setItem('guestCart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter(item => item._id !== productId);
      localStorage.setItem('guestCart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) => {
      const newCart = prevCart.map(item =>
        item._id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem('guestCart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('guestCart');
  };

  // Total item count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total price
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};