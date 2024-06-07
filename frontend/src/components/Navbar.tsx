import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdMenu, MdClose, MdSearch } from 'react-icons/md';
import { BsBag } from 'react-icons/bs';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { Product } from '../types/types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { cartItems } = useCart();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      axios.get(`/api/products/search?name=${searchTerm}`)
        .then((response) => setSearchResults(response.data))
        .catch((error) => console.error('Error fetching products:', error));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={`p-5 flex items-center justify-between z-50 transition-colors duration-300 ${location.pathname === '/' ? 'fixed top-0 left-0 right-0' : 'sticky top-0'} ${isScrolled ? 'bg-zinc-800' : location.pathname === '/' ? 'bg-zinc-800 bg-opacity-50' : 'bg-zinc-800'}`}>
      <div className="flex items-center custom:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>
      <Link to="/" className="hidden custom:block text-white font-bold ml-2 custom:ml-0">Home</Link>
      <div className="flex custom:hidden flex-1 justify-center absolute left-1/2 transform -translate-x-1/2">
        <Link to="/" className="text-white font-bold">Home</Link>
      </div>
      <div className="hidden custom:flex flex-1 justify-center absolute left-1/2 transform -translate-x-1/2">
        <ul className="flex gap-4 custom:gap-12 list-none m-0">
          <li className="text-white font-light whitespace-nowrap"><Link to="/products" className="text-white">All Products</Link></li>
          <li className="text-white font-light whitespace-nowrap"><Link to="/products/new" className="text-white">New Products</Link></li>
          <li className="text-white font-light whitespace-nowrap"><Link to="/products/category/rings" className="text-white">Rings</Link></li>
          <li className="text-white font-light whitespace-nowrap"><Link to="/products/category/earrings" className="text-white">Earrings</Link></li>
          <li className="text-white font-light whitespace-nowrap"><Link to="/products/category/bracelets" className="text-white">Bracelets</Link></li>
          <li className="text-white font-light whitespace-nowrap"><Link to="/products/category/necklaces" className="text-white">Necklaces</Link></li>
        </ul>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleSearch} className="text-white focus:outline-none pt-1">
          <MdSearch size={28} />
        </button>
        <Link to="/cart" className="text-white font-bold relative">
          <BsBag size={24} />
          {cartItemCount > 0 && (
            <span className="absolute -bottom-2 -right-2 bg-white text-black text-xs rounded-full px-2 py-0.5">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
      {searchOpen && (
        <div className="fixed top-0 left-0 w-full h-2/3 bg-zinc-800 bg-opacity-95 flex flex-col items-center z-50 pt-2">
          <div className="relative w-full max-w-2xl p-5 flex items-center justify-between">
            <input
              type="text"
              id="search" 
              name="search" 
              className="w-full max-w-2/3 p-2 rounded bg-white text-black"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search products"
            />
            <button onClick={toggleSearch} className="text-white focus:outline-none ml-4">
              <MdClose size={24} />
            </button>
          </div>
          {searchResults.length > 0 && (
            <ul className="w-full max-w-3xl p-5 bg-white rounded-lg shadow-lg overflow-y-auto">
              {searchResults.map((product) => (
                <li key={product.id} className="p-2 hover:underline">
                  <Link to={`/products/${product.id}`} onClick={toggleSearch}>
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div className={`custom:hidden fixed top-0 left-0 h-full bg-zinc-800 bg-opacity-95 flex flex-col items-center justify-center z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-full sm:w-1/3`}>
        <button onClick={toggleMenu} className="absolute top-4 right-4 text-white focus:outline-none">
          <MdClose size={24} />
        </button>
        <ul className="flex flex-col items-center space-y-8">
          <li className="text-white text-xl font-bold"><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li className="text-white text-xl font-light"><Link to="/products" onClick={toggleMenu}>All Products</Link></li>
          <li className="text-white text-xl font-light"><Link to="/products/new" onClick={toggleMenu}>New Products</Link></li>
          <li className="text-white text-xl font-light"><Link to="/products/category/rings" onClick={toggleMenu}>Rings</Link></li>
          <li className="text-white text-xl font-light"><Link to="/products/category/earrings" onClick={toggleMenu}>Earrings</Link></li>
          <li className="text-white text-xl font-light"><Link to="/products/category/bracelets" onClick={toggleMenu}>Bracelets</Link></li>
          <li className="text-white text-xl font-light"><Link to="/products/category/necklaces" onClick={toggleMenu}>Necklaces</Link></li>
          <li className="text-white text-xl font-bold"><Link to="/cart" onClick={toggleMenu}>Cart</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
