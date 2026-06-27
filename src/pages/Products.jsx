import React, { useState, useMemo } from 'react';
import { 
  Star, 
  SlidersHorizontal, 
  Grid, 
  List, 
  ChevronDown,
  ShoppingBag,
  Heart,
  Eye,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Products() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [addedProductId, setAddedProductId] = useState(null);
  const itemsPerPage = 9;

  // All Products Data
  const allProducts = [
    // Electronics
    { id: 1, name: 'Premium Wireless Headphones Pro', price: 129.99, rating: 4.8, reviews: 124, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', tag: 'Best Seller', tagColor: 'bg-amber-500' },
    { id: 4, name: 'Smart Fitness Tracker', price: 59.99, rating: 4.5, reviews: 95, category: 'Electronics', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80', tag: 'Sale', tagColor: 'bg-red-500' },
    { id: 7, name: 'Mechanical Gaming Keyboard', price: 89.00, rating: 4.7, reviews: 210, category: 'Electronics', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80', tag: 'Popular', tagColor: 'bg-purple-500' },
    { id: 14, name: 'Wireless Earbuds Pro', price: 79.99, rating: 4.6, reviews: 167, category: 'Electronics', image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=80', tag: 'New', tagColor: 'bg-blue-500' },
    { id: 15, name: '4K Action Camera', price: 199.99, rating: 4.8, reviews: 89, category: 'Electronics', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80', tag: 'Top Rated', tagColor: 'bg-green-500' },
    { id: 27, name: 'Smartphone Ultra Max', price: 999.99, rating: 4.9, reviews: 456, category: 'Electronics', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80', tag: 'Premium', tagColor: 'bg-amber-700' },
    { id: 28, name: 'Gaming Laptop Pro', price: 1499.99, rating: 4.9, reviews: 189, category: 'Electronics', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&q=80', tag: 'Premium', tagColor: 'bg-amber-700' },
    { id: 29, name: 'Bluetooth Speaker Boom', price: 89.99, rating: 4.6, reviews: 145, category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80', tag: 'Trending', tagColor: 'bg-indigo-500' },

    // Fashion
    { id: 2, name: 'Minimalist Leather Watch', price: 89.50, rating: 4.6, reviews: 88, category: 'Fashion', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', tag: 'New', tagColor: 'bg-blue-500' },
    { id: 6, name: 'Classic Denim Jacket', price: 75.00, rating: 4.4, reviews: 67, category: 'Fashion', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80', tag: 'Trending', tagColor: 'bg-indigo-500' },
    { id: 8, name: 'Modern Sunglasses', price: 45.00, rating: 4.3, reviews: 112, category: 'Fashion', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80', tag: 'Popular', tagColor: 'bg-purple-500' },
    { id: 16, name: 'Cashmere Scarf Luxury', price: 65.00, rating: 4.7, reviews: 45, category: 'Fashion', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80', tag: 'Best Seller', tagColor: 'bg-amber-500' },
    { id: 30, name: 'Leather Backpack Premium', price: 65.00, rating: 4.3, reviews: 89, category: 'Fashion', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', tag: 'Best Seller', tagColor: 'bg-amber-500' },
    { id: 31, name: 'Casual Sneakers White', price: 89.99, rating: 4.6, reviews: 234, category: 'Fashion', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80', tag: 'Top Rated', tagColor: 'bg-green-500' },

    // Home & Living
    { id: 3, name: 'Ergonomic Office Chair', price: 249.00, rating: 4.9, reviews: 312, category: 'Home & Living', image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&q=80', tag: 'Top Rated', tagColor: 'bg-green-500' },
    { id: 9, name: 'Modern Desk Lamp', price: 35.50, rating: 4.6, reviews: 156, category: 'Home & Living', image: 'https://images.unsplash.com/photo-1507473885769-1065576a88b8?w=600&q=80', tag: 'Best Value', tagColor: 'bg-teal-500' },
    { id: 17, name: 'Ceramic Vase Set', price: 48.00, rating: 4.5, reviews: 67, category: 'Home & Living', image: 'https://images.unsplash.com/photo-1578500494198-246f84d5a102?w=600&q=80', tag: 'New', tagColor: 'bg-blue-500' },
    { id: 32, name: 'Coffee Maker Deluxe', price: 149.99, rating: 4.8, reviews: 278, category: 'Home & Living', image: 'https://images.unsplash.com/photo-1517668808822-9f02f4a6fc37?w=600&q=80', tag: 'Top Rated', tagColor: 'bg-green-500' },

    // Beauty
    { id: 5, name: 'Hydrating Face Serum', price: 34.00, rating: 4.7, reviews: 203, category: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80', tag: 'Popular', tagColor: 'bg-purple-500' },
    { id: 10, name: 'Luxury Scented Candle', price: 22.00, rating: 4.8, reviews: 189, category: 'Beauty', image: 'https://images.unsplash.com/photo-1602603352210-93c6f5a34e06?w=600&q=80', tag: 'Best Seller', tagColor: 'bg-amber-500' },
    { id: 33, name: 'Skincare Cream Set', price: 49.99, rating: 4.6, reviews: 145, category: 'Beauty', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', tag: 'Top Rated', tagColor: 'bg-green-500' },

    // Sports
    { id: 21, name: 'Running Shoes Pro', price: 95.00, rating: 4.7, reviews: 234, category: 'Sports', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', tag: 'Top Rated', tagColor: 'bg-green-500' },
    { id: 22, name: 'Yoga Mat Premium', price: 29.99, rating: 4.5, reviews: 134, category: 'Sports', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80', tag: 'Popular', tagColor: 'bg-purple-500' },
    { id: 34, name: 'Dumbbell Set 20kg', price: 89.99, rating: 4.6, reviews: 78, category: 'Sports', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80', tag: 'Best Seller', tagColor: 'bg-amber-500' },

    // Books
    { id: 12, name: 'Modern Web Design Book', price: 40.00, rating: 4.9, reviews: 312, category: 'Books', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80', tag: 'Best Seller', tagColor: 'bg-amber-500' },
    { id: 19, name: 'The Art of Coding', price: 35.00, rating: 4.6, reviews: 145, category: 'Books', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=80', tag: 'Trending', tagColor: 'bg-indigo-500' },

    // Grocery
    { id: 13, name: 'Organic Coffee Beans', price: 18.50, rating: 4.7, reviews: 203, category: 'Grocery', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80', tag: 'Premium', tagColor: 'bg-amber-700' },
    { id: 20, name: 'Premium Olive Oil', price: 28.00, rating: 4.8, reviews: 156, category: 'Grocery', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80', tag: 'Top Rated', tagColor: 'bg-green-500' },
  ];

  // Categories
  const categories = ['All', ...new Set(allProducts.map(p => p.category))];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = allProducts;

    // Filter by category
    if (selectedCategory !== 'All') {
      products = products.filter(p => p.category === selectedCategory);
    }

    // Filter by price range
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        products.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return products;
  }, [selectedCategory, sortBy, priceRange]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-6 lg:py-10">
        
        {/* ============ PAGE HEADER - Responsive ============ */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-3 sm:pb-6 mb-4 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Products</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
              {filteredProducts.length} products available
            </p>
          </div>
          
          <div className="mt-3 sm:mt-0 flex items-center gap-2 sm:gap-4 flex-wrap">
            {/* Mobile Filter Button */}
            <button 
              onClick={() => setShowMobileFilter(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition lg:hidden"
            >
              <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> 
              <span>Filters</span>
            </button>

            {/* Sort Dropdown - Responsive */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-3 sm:px-4 py-1.5 sm:py-2 pr-7 sm:pr-8 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 max-w-[120px] sm:max-w-none"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-gray-200 rounded-lg p-1 bg-white">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition ${viewMode === 'grid' ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
              >
                <Grid className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition ${viewMode === 'list' ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          
          {/* ============ SIDEBAR FILTERS - Hidden on Mobile ============ */}
          <aside className="hidden lg:block space-y-4 sm:space-y-6">
            {/* Categories */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 sm:mb-4">
                Categories
              </h3>
              <div className="space-y-0.5 sm:space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                      selectedCategory === cat 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {cat}
                    <span className="float-right text-[10px] sm:text-xs opacity-70">
                      {allProducts.filter(p => cat === 'All' ? true : p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 sm:mb-4">
                Price Range
              </h3>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 cursor-pointer">
                  <input 
                    type="radio" 
                    name="price"
                    onChange={() => setPriceRange([0, 50])}
                    className="text-amber-500 focus:ring-amber-500 h-3.5 w-3.5 sm:h-4 sm:w-4"
                  /> Under $50
                </label>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 cursor-pointer">
                  <input 
                    type="radio" 
                    name="price"
                    onChange={() => setPriceRange([50, 100])}
                    className="text-amber-500 focus:ring-amber-500 h-3.5 w-3.5 sm:h-4 sm:w-4"
                  /> $50 - $100
                </label>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 cursor-pointer">
                  <input 
                    type="radio" 
                    name="price"
                    onChange={() => setPriceRange([100, 200])}
                    className="text-amber-500 focus:ring-amber-500 h-3.5 w-3.5 sm:h-4 sm:w-4"
                  /> $100 - $200
                </label>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 cursor-pointer">
                  <input 
                    type="radio" 
                    name="price"
                    onChange={() => setPriceRange([200, 1000])}
                    className="text-amber-500 focus:ring-amber-500 h-3.5 w-3.5 sm:h-4 sm:w-4"
                  /> Over $200
                </label>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 cursor-pointer">
                  <input 
                    type="radio" 
                    name="price"
                    defaultChecked
                    onChange={() => setPriceRange([0, 1000])}
                    className="text-amber-500 focus:ring-amber-500 h-3.5 w-3.5 sm:h-4 sm:w-4"
                  /> All Prices
                </label>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 sm:mb-4">
                Rating
              </h3>
              <div className="space-y-1.5 sm:space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <label key={stars} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="text-amber-500 focus:ring-amber-500 rounded h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${i < stars ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} />
                      ))}
                      <span className="ml-0.5 sm:ml-1 text-[10px] sm:text-xs text-gray-400">& Up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* ============ PRODUCT GRID - Responsive ============ */}
          <main className="lg:col-span-3">
            <div className={`grid gap-3 sm:gap-4 lg:gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {paginatedProducts.map((product) => (
                <div 
                  key={product.id} 
                  className={`bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition duration-300 relative ${
                    viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                  }`}
                >
                  {/* Tag - Responsive */}
                  <span className={`absolute top-2 sm:top-3 left-2 sm:left-3 text-white font-bold tracking-tight text-[8px] sm:text-[10px] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-lg z-10 uppercase ${product.tagColor}`}>
                    {product.tag}
                  </span>

                  {/* Wishlist Button - Responsive */}
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1 sm:p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg z-10 hover:bg-white transition"
                  >
                    <Heart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>

                  {/* Image - Responsive */}
                  <div className={`${viewMode === 'list' ? 'sm:w-40 sm:flex-shrink-0' : ''} aspect-square bg-gray-50 overflow-hidden relative`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500" 
                      loading="lazy"
                    />
                    {/* Quick View Overlay - Hidden on mobile */}
                    <div className="hidden sm:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition items-center justify-center gap-2">
                      <Link 
                        to={`/product/${product.id}`}
                        className="p-2 bg-white rounded-full hover:bg-amber-500 hover:text-white transition shadow-lg"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Details - Responsive */}
                  <div className={`p-2.5 sm:p-4 space-y-1 sm:space-y-2 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-center' : ''}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] sm:text-xs text-gray-500 px-1.5 sm:px-2 py-0.5 bg-gray-100 rounded-full truncate max-w-[60px] sm:max-w-none">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 text-[10px] sm:text-xs font-semibold">
                        <Star className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-current" />
                        <span>{product.rating}</span>
                        <span className="text-gray-400 font-normal hidden xs:inline">({product.reviews})</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-amber-600 transition">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-1 sm:pt-2">
                      <span className="text-sm sm:text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className={`text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition duration-200 ${
                          addedProductId === product.id
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:scale-105'
                        }`}
                      >
                        {addedProductId === product.id ? '✓' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 sm:py-20 bg-white rounded-2xl border border-gray-100">
                <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                <p className="text-gray-500 font-medium text-sm sm:text-base">No products found</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Try adjusting your filters</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange([0, 1000]);
                  }}
                  className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-500 text-white rounded-lg text-xs sm:text-sm hover:bg-amber-600 transition"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* ============ PAGINATION - Responsive ============ */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1 sm:gap-2 mt-4 sm:mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1.5 sm:p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
                
                <div className="flex gap-0.5 sm:gap-1">
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={i}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1.5 sm:p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* ============ MOBILE FILTER SIDEBAR ============ */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilter(false)}></div>
          <div className="absolute right-0 top-0 h-full w-[280px] sm:w-80 bg-white shadow-xl overflow-y-auto p-4 sm:p-6 animate-slide-in">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold">Filters</h2>
              <button 
                onClick={() => setShowMobileFilter(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Categories - Mobile */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 sm:mb-3">Categories</h3>
              <div className="space-y-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowMobileFilter(false);
                    }}
                    className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                      selectedCategory === cat 
                        ? 'bg-amber-500 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range - Mobile */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 sm:mb-3">Price Range</h3>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <input type="radio" name="price-mobile" className="text-amber-500" /> Under $50
                </label>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <input type="radio" name="price-mobile" className="text-amber-500" /> $50 - $100
                </label>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <input type="radio" name="price-mobile" className="text-amber-500" /> $100 - $200
                </label>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <input type="radio" name="price-mobile" className="text-amber-500" defaultChecked /> All Prices
                </label>
              </div>
            </div>

            <button 
              onClick={() => setShowMobileFilter(false)}
              className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm sm:text-base font-semibold rounded-xl"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Add animation styles */}
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}