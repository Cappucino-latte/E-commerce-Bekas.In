
// Cart constants to avoid Fast refresh issues
export const CART_STORAGE_KEY = 'bekasCart';
export const WISHLIST_STORAGE_KEY = 'bekasWishlist';

export const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
};

export const saveCartToStorage = (cartItems) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
};

// Wishlist functions
export const getWishlist = () => {
  try {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error('Error loading wishlist from localStorage:', error);
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
    return [];
  }
};

export const saveWishlistToStorage = (wishlistItems) => {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
};

export const toggleWishlist = (product) => {
  const wishlist = getWishlist();
  const isInWishlist = wishlist.some(item => item.id === product.id);
  
  let updatedWishlist;
  if (isInWishlist) {
    updatedWishlist = wishlist.filter(item => item.id !== product.id);
  } else {
    updatedWishlist = [...wishlist, product];
  }
  
  saveWishlistToStorage(updatedWishlist);
  return updatedWishlist;
};
