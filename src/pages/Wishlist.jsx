import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ShoppingBag, ArrowRight, X, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const wishlistData = localStorage.getItem('wishlist');
        if (wishlistData) {
          const wishlistIds = JSON.parse(wishlistData);
          // Fetch full product details from allProducts
          const products = getProductsByIds(wishlistIds);
          setWishlistItems(products);
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  // All products data (same as in other pages)
  const allProducts = [
    { id: 1, name: 'Premium Wireless Headphones Pro', price: 129.99, rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', tag: 'Best Seller', category: 'Electronics' },
    { id: 2, name: 'Smartphone Ultra Max', price: 999.99, rating: 4.9, reviews: 456, image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80', tag: 'New', category: 'Electronics' },
    { id: 3, name: 'Smart Watch Series 8', price: 349.00, rating: 4.7, reviews: 234, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80', tag: 'Top Rated', category: 'Electronics' },
    { id: 4, name: 'Wireless Earbuds Pro', price: 79.99, rating: 4.7, reviews: 210, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=80', tag: 'Popular', category: 'Electronics' },
    { id: 5, name: 'Gaming Laptop Pro', price: 1499.99, rating: 4.9, reviews: 189, image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&q=80', tag: 'Premium', category: 'Electronics' },
    { id: 6, name: '4K Camera DSLR', price: 799.00, rating: 4.8, reviews: 167, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80', tag: 'Best Value', category: 'Electronics' },
    { id: 7, name: 'Bluetooth Speaker Boom', price: 89.99, rating: 4.6, reviews: 145, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80', tag: 'Trending', category: 'Electronics' },
    { id: 8, name: 'Drone 4K Pro', price: 599.00, rating: 4.7, reviews: 98, image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&q=80', tag: 'New', category: 'Electronics' },
    { id: 9, name: 'Classic Denim Jacket', price: 75.00, rating: 4.4, reviews: 67, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80', tag: 'Trending', category: 'Fashion' },
    { id: 10, name: 'Leather Backpack Premium', price: 65.00, rating: 4.3, reviews: 89, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', tag: 'Best Seller', category: 'Fashion' },
    { id: 11, name: 'Designer Sunglasses', price: 45.00, rating: 4.5, reviews: 112, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', tag: 'Popular', category: 'Fashion' },
    { id: 12, name: 'Casual Sneakers White', price: 89.99, rating: 4.6, reviews: 234, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80', tag: 'Top Rated', category: 'Fashion' },
    { id: 13, name: 'Ergonomic Office Chair', price: 249.00, rating: 4.9, reviews: 312, image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&q=80', tag: 'Top Rated', category: 'Home & Living' },
    { id: 14, name: 'Modern Desk Lamp', price: 35.50, rating: 4.6, reviews: 156, image: 'https://images.unsplash.com/photo-1507473885769-1065576a88b8?w=600&q=80', tag: 'Best Value', category: 'Home & Living' },
    { id: 15, name: 'Coffee Maker Deluxe', price: 149.99, rating: 4.8, reviews: 278, image: 'https://images.unsplash.com/photo-1517668808822-9f02f4a6fc37?w=600&q=80', tag: 'Top Rated', category: 'Home & Living' },
    { id: 16, name: 'Luxury Sofa Set', price: 899.00, rating: 4.9, reviews: 234, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', tag: 'Premium', category: 'Home & Living' },
    { id: 17, name: 'Luxury Perfume', price: 89.99, rating: 4.7, reviews: 189, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80', tag: 'Best Seller', category: 'Beauty' },
    { id: 18, name: 'Skincare Cream Set', price: 49.99, rating: 4.6, reviews: 145, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', tag: 'Top Rated', category: 'Beauty' },
    { id: 19, name: 'Yoga Mat Premium', price: 29.99, rating: 4.5, reviews: 134, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80', tag: 'Popular', category: 'Sports' },
    { id: 20, name: 'Running Shoes Pro', price: 129.99, rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', tag: 'Top Rated', category: 'Sports' },
    { id: 21, name: 'Organic Coffee Beans', price: 18.50, rating: 4.7, reviews: 203, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80', tag: 'Premium', category: 'Grocery' },
    { id: 22, name: 'Bestseller Novel 2026', price: 24.99, rating: 4.8, reviews: 312, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80', tag: 'Best Seller', category: 'Books' },
  ];

  // Get full product details from IDs
  const getProductsByIds = (ids) => {
    return ids
      .map(id => allProducts.find(p => p.id === id))
      .filter(product => product !== undefined);
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  // Remove from wishlist
  const handleRemoveFromWishlist = (id) => {
    setRemovingId(id);
    
    setTimeout(() => {
      const updatedWishlist = wishlistItems.filter(item => item.id !== id);
      setWishlistItems(updatedWishlist);
      
      // Update localStorage
      const wishlistIds = updatedWishlist.map(item => item.id);
      localStorage.setItem('wishlist', JSON.stringify(wishlistIds));
      
      setRemovingId(null);
    }, 300);
  };

  // Clear all wishlist
  const handleClearWishlist = () => {
    setWishlistItems([]);
    localStorage.setItem('wishlist', JSON.stringify([]));
    setShowClearConfirm(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-gray-50 via-white to-amber-50/30 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500 fill-current" />
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Wishlist</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {wishlistItems.length > 0 
                ? `${wishlistItems.length} items in your wishlist` 
                : 'Your wishlist is empty'}
            </p>
          </div>
          
          {wishlistItems.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </button>
              <Link 
                to="/products" 
                className="text-sm text-amber-500 hover:text-amber-600 font-medium flex items-center gap-1 group"
              >
                Browse Products
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          )}
        </div>

        {/* ============ EMPTY WISHLIST ============ */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl border border-amber-100/50 shadow-2xl shadow-amber-500/5">
            <div className="inline-flex p-6 bg-red-50 rounded-full mb-6">
              <Heart className="h-20 w-20 text-red-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm">
              Start adding items you love to your wishlist. 
              Click the heart icon on any product.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3.5 rounded-xl text-sm font-medium hover:scale-105 transition shadow-lg shadow-amber-500/30"
            >
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          /* ============ WISHLIST ITEMS ============ */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className={`group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition hover:-translate-y-1 ${
                  removingId === item.id ? 'opacity-0 scale-95 transition-all duration-300' : ''
                }`}
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 text-white text-[10px] font-medium px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm">
                    {item.category || 'General'}
                  </span>
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 shadow-sm transition"
                    title="Remove from wishlist"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  {/* Quick Add to Cart Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="px-4 py-2 bg-white text-gray-900 rounded-xl text-sm font-medium hover:bg-amber-500 hover:text-white transition shadow-lg flex items-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-2">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-bold text-gray-800 text-sm line-clamp-1 group-hover:text-amber-600 transition">
                      {item.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-amber-500">★</span>
                    <span className="text-gray-600">{item.rating || 4.5}</span>
                    <span className="text-gray-400">({item.reviews || 0} reviews)</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-gray-900">${(item.price || 0).toFixed(2)}</span>
                    
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition duration-200 ${
                        addedToCart === item.id
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:scale-105'
                      }`}
                    >
                      {addedToCart === item.id ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ============ CLEAR WISHLIST CONFIRMATION MODAL ============ */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowClearConfirm(false)}
          ></div>
          <div className="relative max-w-sm w-full bg-white rounded-3xl shadow-2xl p-8 animate-fade-in">
            <div className="text-center">
              <div className="inline-flex p-4 bg-red-50 rounded-full mb-4">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Clear Wishlist?</h3>
              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to remove all items from your wishlist?
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearWishlist}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl hover:scale-105 transition shadow-lg shadow-red-500/25 text-sm"
                >
                  Yes, Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>

    </div>
  );
}