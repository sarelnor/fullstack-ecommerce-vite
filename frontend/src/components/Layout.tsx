import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CartProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
};

export default Layout;
