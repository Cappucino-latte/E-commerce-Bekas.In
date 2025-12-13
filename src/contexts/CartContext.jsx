import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { loadCartFromStorage, saveCartToStorage } from './cartUtils';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => loadCartFromStorage());
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = (product, quantity = 1) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        
        let newItems;
        if (existingItem) {
          newItems = prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          toast.success('Quantity updated in cart!', {
            icon: '🛒',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
        } else {
          newItems = [...prevItems, { ...product, quantity }];
          toast.success('Added to cart!', {
            icon: '🛒',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
        }
        
        saveCartToStorage(newItems);
        setIsLoading(false);
        return newItems;
      });
    }, 300);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      saveCartToStorage(newItems);
      toast.success('Item removed from cart!', {
        icon: '🗑️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return newItems;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
      saveCartToStorage(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    saveCartToStorage([]);
    toast.success('Cart cleared!', {
      icon: '🧹',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const getCartItem = (productId) => {
    return cartItems.find(item => item.id === productId);
  };

  const value = {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    getCartItem
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};