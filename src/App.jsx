

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import SearchResults from './pages/SearchResults';
import Sell from './pages/Sell';
import Messages from './pages/Messages';
import ErrorBoundary from './components/ErrorBoundary';
import { CartProvider } from './contexts/CartContext';
import { MessagesProvider } from './contexts/MessagesContext';
import { NotificationsProvider } from './contexts/NotificationsContext';

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <MessagesProvider>
          <NotificationsProvider>
            <Router>
              <div className="min-h-screen bg-slate-50 font-sans text-gray-900 flex flex-col">
                <Navbar />
                
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/sell" element={<Sell />} />
                    <Route path="/messages" element={<Messages />} />
                  </Routes>
                </main>

                <Footer />
              </div>
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#333',
                    color: '#fff',
                    borderRadius: '12px',
                    padding: '16px',
                  },
                }}
              />
            </Router>
          </NotificationsProvider>
        </MessagesProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
