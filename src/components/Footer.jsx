
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  
  return (
    <>
      {/* Mobile Bottom Nav Spacer */}
      <div className="md:hidden h-16"></div>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 flex justify-between items-center z-50">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-primary' : 'text-gray-400'}`}
        >
          <div className="w-6 h-6">
            <div className="grid grid-cols-2 gap-0.5 w-5 h-5 mt-0.5">
              <div className="bg-current rounded-[1px]"></div>
              <div className="bg-current rounded-[1px]"></div>
              <div className="bg-current rounded-[1px]"></div>
              <div className="bg-current rounded-[1px]"></div>
            </div>
          </div>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        
        <Link to="/wishlist" className="flex flex-col items-center gap-1 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-[10px] font-medium">Wishlist</span>
        </Link>
        
        <Link 
          to="/sell" 
          className="flex flex-col items-center gap-1 -mt-8"
        >
          <div className="bg-accent text-white p-3 rounded-full shadow-lg shadow-accent/30">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-[10px] font-medium text-gray-600">Jual</span>
        </Link>
        
        <Link 
          to="/cart" 
          className={`flex flex-col items-center gap-1 ${location.pathname === '/cart' ? 'text-primary' : 'text-gray-400'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-[10px] font-medium">Cart</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center gap-1 ${location.pathname === '/profile' ? 'text-primary' : 'text-gray-400'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>

      {/* Desktop Footer */}
      <footer className="bg-primary text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="text-2xl font-bold tracking-tighter">
                Bekas<span className="text-accent">.in</span>
              </Link>
              <p className="text-slate-300 text-sm mt-4 leading-relaxed">
                Platform terpercaya untuk jual beli barang bekas berkualitas dengan sistem pembayaran aman.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-slate-400 hover:text-accent transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-accent transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-accent transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-accent transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Jelajahi</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-slate-300 hover:text-accent transition-colors">Beranda</Link></li>
                <li><Link to="/search" className="text-slate-300 hover:text-accent transition-colors">Semua Produk</Link></li>
                <li><Link to="/sell" className="text-slate-300 hover:text-accent transition-colors">Jual Barang</Link></li>
                <li><Link to="/wishlist" className="text-slate-300 hover:text-accent transition-colors">Wishlist</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold text-lg mb-4">Kategori</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-300 hover:text-accent transition-colors">Handphone</a></li>
                <li><a href="#" className="text-slate-300 hover:text-accent transition-colors">Laptop</a></li>
                <li><a href="#" className="text-slate-300 hover:text-accent transition-colors">Kamera</a></li>
                <li><a href="#" className="text-slate-300 hover:text-accent transition-colors">Audio</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-lg mb-4">Hubungi Kami</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="text-slate-300">support@bekas.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent" />
                  <span className="text-slate-300">+62 812-3456-7890</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-slate-300">Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-700 my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 Bekas.in. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-accent text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-accent text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-accent text-sm transition-colors">Help Center</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
