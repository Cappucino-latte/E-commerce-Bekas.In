
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { PRODUCTS } from '../data/mockData';
import toast from 'react-hot-toast';


const Wishlist = () => {
  // Initialize wishlist from localStorage
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('bekasWishlist');
    if (savedWishlist) {
      try {
        const wishlistIds = JSON.parse(savedWishlist);
        return PRODUCTS.filter(product => 
          wishlistIds.includes(product.id)
        );
      } catch (error) {
        console.error('Error loading wishlist:', error);
        localStorage.removeItem('bekasWishlist');
      }
    }
    return [];
  });
  
  const { addToCart } = useCart();

  const removeFromWishlist = (productId) => {
    const newWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(newWishlist);
    
    // Update localStorage
    const wishlistIds = newWishlist.map(item => item.id);
    localStorage.setItem('bekasWishlist', JSON.stringify(wishlistIds));
    
    toast.success('Removed from wishlist', {
      icon: '💔',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const addToCartAndRemoveFromWishlist = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-20 pb-32 md:pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Link to="/" className="p-2 hover:bg-white rounded-xl transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Save items you love to your wishlist</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-32 md:pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="p-2 hover:bg-white rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            My Wishlist ({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group"
            >
              <Link to={`/product/${item.id}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromWishlist(item.id);
                    }}
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-red-500 hover:bg-white transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-red-500" />
                  </button>
                  
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      {item.condition}
                    </span>
                  </div>
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                <p className="text-primary font-bold text-lg mt-2">
                  Rp {item.price.toLocaleString('id-ID')}
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>⭐</span>
                    <span>{item.rating}</span>
                    <span>•</span>
                    <span>Terjual {item.sold}</span>
                  </div>
                  
                  <button 
                    onClick={() => addToCartAndRemoveFromWishlist(item)}
                    className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-1"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
