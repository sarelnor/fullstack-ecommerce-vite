import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import NewProducts from './pages/NewProducts';
import BraceletsPage from './pages/BraceletsPage';
import EarringsPage from './pages/EarringsPage';
import NecklacesPage from './pages/NecklacesPage';
import RingsPage from './pages/RingsPage';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductPage from './pages/ProductPage';

const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Navbar isHome={isHome} />
      <main className={`${isHome ? "" : "py-10 px-6"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/new" element={<NewProducts />} />
          <Route path="/products/category/bracelets" element={<BraceletsPage />} />
          <Route path="/products/category/earrings" element={<EarringsPage />} />
          <Route path="/products/category/necklaces" element={<NecklacesPage />} />
          <Route path="/products/category/rings" element={<RingsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
