import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Star, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { getWishlist, toggleWishlist } from '../contexts/cartUtils';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const checkWishlistStatus = useCallback(() => {
    const wishlist = getWishlist();
    return wishlist.some(item => item.id === product.id);
  }, [product.id]);

  useEffect(() => {
    setTimeout(() => setIsWishlisted(checkWishlistStatus()), 0);
  }, [checkWishlistStatus]);

  const handleWishlistToggle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleWishlist(product);
    const newStatus = !isWishlisted;
    setIsWishlisted(newStatus);
    
    toast(
      newStatus ? 'Added to wishlist' : 'Removed from wishlist',
      {
        icon: newStatus ? '❤️' : '💔',
        duration: 2000,
      }
    );
  }, [isWishlisted, product]);

  const handleAddToCart = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    
    // Simulate a brief delay for better UX
    setTimeout(() => {
      addToCart(product, 1);
      toast.success('Added to cart!', {
        icon: '🛒',
        duration: 2000,
      });
      setIsAddingToCart(false);
    }, 300);
  }, [product, addToCart]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 relative">
        
        {/* Floating Condition Badge */}
        <div className="absolute top-3 left-3 z-10 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
          {product.condition}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          {/* Wishlist Button */}
          <button 
            onClick={handleWishlistToggle}
            className={`bg-white/80 p-1.5 rounded-full transition-colors ${
              isWishlisted 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-gray-400 hover:text-red-500 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          
          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="bg-white/80 p-1.5 rounded-full text-gray-400 hover:text-primary hover:bg-white transition-colors disabled:opacity-50"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                <h3 className="font-bold text-gray-800 text-base line-clamp-1 group-hover:text-primary transition-colors">{product.title}</h3>
             </div>
          </div>
          
          <p className="text-primary font-extrabold text-lg mt-2">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 text-xs text-gray-500">
            <div className="flex items-center gap-1">
               <MapPin className="w-3 h-3" />
               <span className="truncate max-w-[80px]">{product.location}</span>
            </div>
            <div className="flex items-center gap-1">
               <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
               <span className="font-medium text-gray-700">{product.rating}</span>
               <span className="text-gray-300">|</span>
               <span>Terjual {product.sold}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;