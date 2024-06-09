import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartItem, CartContextProps } from "../types/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/styles.css";

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    axios
      .get("/api/cart")
      .then((response) => {
        setCartItems(response.data);
        calculateTotalCost(response.data);
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  const calculateTotalCost = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalCost(total);
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      await axios.post("/api/cart", { productId, quantity });
      const updatedItems = [...cartItems];
      const itemIndex = updatedItems.findIndex((item) => item.product_id === productId);
      if (itemIndex !== -1) {
        updatedItems[itemIndex].quantity += quantity;
      } else {
        const { data: product } = await axios.get(`/api/products/${productId}`);
        updatedItems.push({ ...product, product_id: productId, quantity });
      }
      setCartItems(updatedItems);
      calculateTotalCost(updatedItems);
      toast.success("Product added to cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: '#fff', color: 'black' },
        progressStyle: { backgroundColor: '#ff9800' }
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding product to cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: '#f44336', color: '#fff' },
        progressStyle: { backgroundColor: '#ff9800' }
      });
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      await axios.post("/api/cart/update", { productId, quantity });
      const updatedItems = cartItems.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);
      calculateTotalCost(updatedItems);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await axios.post("/api/cart/remove", { productId });
      const updatedItems = cartItems.filter((item) => item.product_id !== productId);
      setCartItems(updatedItems);
      calculateTotalCost(updatedItems);
      toast.success("Product removed from cart.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: '#fff', color: 'black' },
        progressStyle: { backgroundColor: '#ff9800' }
      });
    } catch (error) {
      console.error("Error removing product from cart:", error);
      toast.error("Error removing product from cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: '#f44336', color: '#fff' },
        progressStyle: { backgroundColor: '#ff9800' }
      });
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, totalCost, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
