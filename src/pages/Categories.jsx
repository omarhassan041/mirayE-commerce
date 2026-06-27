import React, { useState } from 'react';
import { Star, SlidersHorizontal, Grid, List, ChevronDown, ShoppingCart, Check } from 'lucide-react';
// 1. Soo geli hook-gii dambiilaha
import { useCart } from '../context/CartContext';

export default function Products() {
  // 2. Kala soo bax shaqada addToCart
  const { addToCart } = useCart();
  const [addedProductId, setAddedProductId] = useState(null);

  // Dhammaan alaabta suuqa (Mock Data)
  const allProducts = [
    // Electronics
    { id: 1, name: 'Premium Wireless Headphones', price: 129.99, rating: 4.8, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
    { id: 4, name: 'Smart Fitness Tracker', price: 59.99, rating: 4.5, category: 'Electronics', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80' },
    { id: 7, name: 'Mechanical Gaming Keyboard', price: 89.00, rating: 4.7, category: 'Electronics', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80' },
    { id: 14, name: 'Wireless Earbuds', price: 79.99, rating: 4.6, category: 'Electronics', image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&q=80' },
    { id: 15, name: '4K Action Camera', price: 199.99, rating: 4.8, category: 'Electronics', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80' },

    // Fashion
    { id: 2, name: 'Minimalist Leather Watch', price: 89.50, rating: 4.6, category: 'Fashion', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
    { id: 6, name: 'Classic Denim Jacket', price: 75.00, rating: 4.4, category: 'Fashion', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80' },
    { id: 8, name: 'Modern Sunglasses', price: 45.00, rating: 4.3, category: 'Fashion', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80' },
    { id: 16, name: 'Cashmere Scarf', price: 65.00, rating: 4.7, category: 'Fashion', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80' },

    // Home & Living
    { id: 3, name: 'Ergonomic Office Chair', price: 249.00, rating: 4.9, category: 'Home & Living', image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500&q=80' },
    { id: 9, name: 'Modern Desk Lamp', price: 35.50, rating: 4.6, category: 'Home & Living', image: 'https://images.unsplash.com/photo-1507473885769-1065576a88b8?w=500&q=80' },
    { id: 17, name: 'Ceramic Vase Set', price: 48.00, rating: 4.5, category: 'Home & Living', image: 'https://images.unsplash.com/photo-1578500494198-246f84d5a102?w=500&q=80' },

    // Beauty
    { id: 5, name: 'Hydrating Face Serum', price: 34.00, rating: 4.7, category: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80' },
    { id: 10, name: 'Luxury Scented Candle', price: 22.00, rating: 4.8, category: 'Beauty', image: 'https://images.unsplash.com/photo-1602603352210-93c6f5a34e06?w=500&q=80' },

    // Accessories
    { id: 11, name: 'Genuine Leather Wallet', price: 55.00, rating: 4.5, category: 'Accessories', image: 'https://images.unsplash.com/photo-1627123424574-724758594093?w=500&q=80' },
    { id: 18, name: 'Stainless Steel Watch', price: 120.00, rating: 4.7, category: 'Accessories', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80' },

    // Books
    { id: 12, name: 'Modern Web Design Book', price: 40.00, rating: 4.9, category: 'Books', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80' },
    { id: 19, name: 'The Art of Coding', price: 35.00, rating: 4.6, category: 'Books', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80' },

    // Grocery
    { id: 13, name: 'Organic Coffee Beans', price: 18.50, rating: 4.7, category: 'Grocery', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&q=80' },
    { id: 20, name: 'Premium Olive Oil', price: 28.00, rating: 4.8, category: 'Grocery', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80' },

    // Sports
    { id: 21, name: 'Running Shoes', price: 95.00, rating: 4.7, category: 'Sports', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
    { id: 22, name: 'Yoga Mat', price: 29.99, rating: 4.5, category: 'Sports', image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&q=80' },

    // Toys
    { id: 23, name: 'Building Blocks Set', price: 24.99, rating: 4.8, category: 'Toys', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d7460?w=500&q=80' },
    { id: 24, name: 'Remote Control Car', price: 39.99, rating: 4.4, category: 'Toys', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&q=80' },

    // Automotive
    { id: 25, name: 'Car Phone Holder', price: 15.99, rating: 4.4, category: 'Automotive', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&q=80' },
    { id: 26, name: 'Dashboard Camera', price: 89.99, rating: 4.6, category: 'Automotive', image: 'https://images.unsplash.com/photo-1549317661-b2ac83b9d0fa?w=500&q=80' },
  ];

  // Isticmaal koodkan si aad si toos ah uga soo saarto qaybaha liiska alaabta
  const categories = ['All', ...new Set(allProducts.map(p => p.category))];

  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sifaynta alaabta iyadoo loo eegayo qaybta la doortay
  const filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  // Handle Add to Cart with feedback
  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* SIFADA SARE (Page Header) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Our Products</h1>
          <p className="mt-2 text-sm text-gray-500">
            {filteredProducts.length} products in {selectedCategory === 'All' ? 'all categories' : selectedCategory}
          </p>
        </div>
        
        {/* Badhamada Qaabka Muuqalka */}
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition md:hidden">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
          <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-gray-50">
            <button className="p-1.5 bg-white rounded-md shadow-sm text-gray-700"><Grid className="h-4 w-4" /></button>
            <button className="p-1.5 text-gray-400 hover:text-gray-700"><List className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR FILTERS (Kaliya Desktop-ka ayuu ka muuqanayaa) */}
        <aside className="hidden lg:block space-y-6">
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                    selectedCategory === cat 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Price Range</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-blue-600" /> Under $50</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-blue-600" /> $50 to $100</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-blue-600" /> Over $100</label>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Rating</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-blue-600" /> ★★★★ & Up</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-blue-600" /> ★★★ & Up</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-blue-600" /> ★★ & Up</label>
            </div>
          </div>
        </aside>

        {/* PRODUCT GRID (Halkan ayay alaabtu ku soo bandhigmaysaa) */}
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition duration-300">
                <div className="aspect-square bg-gray-50 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500" 
                    loading="lazy"
                  />
                  {/* Category badge */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-2 py-1 rounded-lg shadow-sm">
                    {product.category}
                  </span>
                  {/* Rating badge */}
                  <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {product.rating}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-medium text-gray-800 line-clamp-1 group-hover:text-blue-600 transition">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    
                    {/* Add to Cart Button with Feedback */}
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition duration-200 flex items-center gap-1 ${
                        addedProductId === product.id
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-900 text-white hover:bg-blue-600'
                      }`}
                    >
                      {addedProductId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" /> Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Haddii ay dhacdo in alaab la waayo */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-500 font-medium">No products found in this category.</p>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="mt-4 text-blue-600 hover:underline text-sm font-medium"
              >
                View all products
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}