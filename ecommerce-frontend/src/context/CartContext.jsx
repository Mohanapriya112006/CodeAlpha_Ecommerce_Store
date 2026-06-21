import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await api.get('/cart');
      setCart(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Refetch cart whenever the logged-in user changes
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    const res = await api.post('/cart/add', { productId, quantity });
    setCart(res.data);
  };

  const updateQuantity = async (productId, quantity) => {
    const res = await api.put('/cart/update', { productId, quantity });
    setCart(res.data);
  };

  const removeFromCart = async (productId) => {
    const res = await api.delete(`/cart/remove/${productId}`);
    setCart(res.data);
  };

  const clearCart = async () => {
    await api.delete('/cart/clear');
    setCart({ items: [] });
  };

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, loading, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
