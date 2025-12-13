
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Efek Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className={`text-2xl font-bold tracking-tighter transition-colors ${isScrolled ? 'text-primary' : 'text-primary md:text-white'}`}>
              Bekas<span className="text-accent">.in</span>
            </Link>

            {/* Search Bar (Desktop) */}
            <form onSubmit={handleSearch} className={`hidden md:flex flex-1 mx-12 items-center rounded-full px-5 py-2.5 transition-all focus-within:ring-2 focus-within:ring-accent/50 ${isScrolled ? 'bg-gray-100' : 'bg-white/20 backdrop-blur-md border border-white/30'}`}>
              <Search className={`w-5 h-5 ${isScrolled ? 'text-gray-400' : 'text-white/70'}`} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari gadget impianmu..." 
                className={`bg-transparent border-none focus:outline-none w-full ml-3 text-sm ${isScrolled ? 'text-gray-800 placeholder-gray-400' : 'text-white placeholder-white/70'}`}
              />
            </form>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/wishlist" className={`relative transition hover:scale-110 ${isScrolled ? 'text-gray-600' : 'text-white'}`}>
                <Heart className="w-6 h-6" />
              </Link>
              <Link to="/cart" className={`relative transition hover:scale-110 ${isScrolled ? 'text-gray-600' : 'text-white'}`}>
                <ShoppingBag className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <Link to="/auth" className={`font-medium transition hover:underline ${isScrolled ? 'text-gray-600' : 'text-white'}`}>Masuk</Link>
              <Link to="/sell" className="bg-accent text-primary px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white hover:shadow-lg transition transform hover:-translate-y-0.5">
                Jual Barang
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden ${isScrolled ? 'text-gray-800' : 'text-primary'}`}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* PERHATIKAN DISINI: Kita pakai motion.div */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
             <div className="flex flex-col gap-6">
                <form onSubmit={handleSearch} className="w-full">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari barang..." 
                    className="w-full bg-gray-100 p-4 rounded-xl" 
                  />
                </form>
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-gray-800 border-b pb-2">Beranda</Link>
                <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-gray-800 border-b pb-2">Wishlist</Link>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-gray-800 border-b pb-2">Keranjang</Link>
                <Link to="/sell" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-gray-800 border-b pb-2">Jual Barang</Link>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="bg-primary text-white py-4 rounded-xl font-bold mt-4">Masuk / Daftar</Link>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;