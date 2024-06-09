import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { CartItem } from "../types/types";

const Cart: React.FC = () => {
  const { cartItems, totalCost, updateQuantity, removeFromCart } = useCart();

  return (
    <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold my-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg mb-6">Your cart is currently empty.</p>
          <Link to="/products" className="text-blue-500 hover:underline">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <ul className="w-full max-w-4xl bg-white rounded-lg shadow-md p-4 mb-6">
            {cartItems.map((item: CartItem) => (
              <li key={item.product_id} className="flex flex-col md:flex-row items-center justify-between p-4 border-b last:border-b-0">
                <div className="flex flex-col md:flex-row items-center">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="mr-4 mb-4 md:mb-0"
                  />
                  <div>
                    <h2 className="text-xl font-medium font-inter">{item.name}</h2>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-600">Price: ${item.price}</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-2">
                  <button
                    className="px-3 py-1 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-100 transition"
                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="px-3 py-1 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-100 transition"
                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <button
                    className="px-3 py-1 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-100 transition"
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-10">
            <h2 className="text-3xl mb-4">Cart Summary</h2>
            <div className="flex justify-between mb-4">
              <span className="text-lg">Total Items:</span>
              <span className="text-lg">{cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-lg">Total Cost:</span>
              <span className="text-lg">${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-center">
              <button className="w-full max-w-xs mx-auto text-white py-2 rounded font-medium bg-zinc-600 hover:bg-zinc-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;
