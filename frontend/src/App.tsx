import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/new" element={<NewProducts />} />
          <Route path="/products/category/Bracelets" element={<BraceletsPage />} />
          <Route path="/products/category/Earrings" element={<EarringsPage />} />
          <Route path="/products/category/Necklaces" element={<NecklacesPage />} />
          <Route path="/products/category/Rings" element={<RingsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
