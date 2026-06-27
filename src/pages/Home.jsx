import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  ShoppingBag,
  TrendingUp,
  Clock,
  Award,
  Eye,
  Heart,
  Share2,
  Sparkles,
  Zap,
  Gift,
  Percent,
  Headphones,
  Laptop,
  Shirt,
  Home as HomeIcon,
  BookOpen,
  Dumbbell,
  Gem,
  Smartphone,
  Watch,
  Coffee,
  Camera,
  Briefcase,
  Wifi,
  Battery,
  Cpu,
  Monitor,
  Tablet,
  Speaker,
  Drone,
  Music,
  Sofa,
  Lamp,
  // Vase, Mirror, Bag, Shoes, Hat, Sunglasses, Perfume, Cream, Lipstick, Nail, Brush - WAA LA SAARAY
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [addedProductId, setAddedProductId] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  // Hero Slider Data
  const slides = [
    {
      id: 1,
      title: 'Summer Collection 2026',
      subtitle: 'Up to 50% off on selected items',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80',
      cta: 'Shop Now',
      ctaLink: '/products',
      tag: '🔥 Limited Time'
    },
    {
      id: 2,
      title: 'Tech Deals You Love',
      subtitle: 'Premium electronics at unbeatable prices',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&q=80',
      cta: 'Explore Tech',
      ctaLink: '/products?category=Electronics',
      tag: '💡 Tech Deals'
    },
    {
      id: 3,
      title: 'New Fashion Arrivals',
      subtitle: 'Stay ahead of the trends this season',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80',
      cta: 'View Fashion',
      ctaLink: '/products?category=Fashion',
      tag: '✨ New Arrivals'
    }
  ];

  // Categories Data
  const categories = [
    { name: 'All', icon: <Sparkles className="h-4 w-4" /> },
    { name: 'Electronics', icon: <Laptop className="h-4 w-4" /> },
    { name: 'Fashion', icon: <Shirt className="h-4 w-4" /> },
    { name: 'Home & Living', icon: <HomeIcon className="h-4 w-4" /> },
    { name: 'Beauty', icon: <Gem className="h-4 w-4" /> },
    { name: 'Sports', icon: <Dumbbell className="h-4 w-4" /> },
    { name: 'Books', icon: <BookOpen className="h-4 w-4" /> },
    { name: 'Grocery', icon: <Coffee className="h-4 w-4" /> },
  ];

  // All Products - WITH FIXED ICONS
  const allProducts = [
    // Electronics
    { id: 1, name: 'Premium Wireless Headphones Pro', price: 129.99, rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', tag: 'Best Seller', tagColor: 'bg-amber-500', category: 'Electronics', icon: <Headphones className="h-4 w-4" /> },
    { id: 2, name: 'Smartphone Ultra Max', price: 999.99, rating: 4.9, reviews: 456, image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80', tag: 'New', tagColor: 'bg-blue-600', category: 'Electronics', icon: <Smartphone className="h-4 w-4" /> },
    { id: 3, name: 'Smart Watch Series 8', price: 349.00, rating: 4.7, reviews: 234, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80', tag: 'Top Rated', tagColor: 'bg-green-500', category: 'Electronics', icon: <Watch className="h-4 w-4" /> },
    { id: 4, name: 'Wireless Earbuds Pro', price: 79.99, rating: 4.7, reviews: 210, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=80', tag: 'Popular', tagColor: 'bg-purple-500', category: 'Electronics', icon: <Music className="h-4 w-4" /> },
    { id: 5, name: 'Gaming Laptop Pro', price: 1499.99, rating: 4.9, reviews: 189, image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&q=80', tag: 'Premium', tagColor: 'bg-amber-700', category: 'Electronics', icon: <Monitor className="h-4 w-4" /> },
    { id: 6, name: '4K Camera DSLR', price: 799.00, rating: 4.8, reviews: 167, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80', tag: 'Best Value', tagColor: 'bg-teal-500', category: 'Electronics', icon: <Camera className="h-4 w-4" /> },
    { id: 7, name: 'Bluetooth Speaker Boom', price: 89.99, rating: 4.6, reviews: 145, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80', tag: 'Trending', tagColor: 'bg-indigo-500', category: 'Electronics', icon: <Speaker className="h-4 w-4" /> },
    { id: 8, name: 'Drone 4K Pro', price: 599.00, rating: 4.7, reviews: 98, image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&q=80', tag: 'New', tagColor: 'bg-blue-500', category: 'Electronics', icon: <Drone className="h-4 w-4" /> },
    
    // Fashion - FIXED ICONS
    { id: 9, name: 'Classic Denim Jacket', price: 75.00, rating: 4.4, reviews: 67, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80', tag: 'Trending', tagColor: 'bg-indigo-500', category: 'Fashion', icon: <Shirt className="h-4 w-4" /> },
    { id: 10, name: 'Leather Backpack Premium', price: 65.00, rating: 4.3, reviews: 89, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', tag: 'Best Seller', tagColor: 'bg-amber-500', category: 'Fashion', icon: <Briefcase className="h-4 w-4" /> },
    { id: 11, name: 'Designer Sunglasses', price: 45.00, rating: 4.5, reviews: 112, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', tag: 'Popular', tagColor: 'bg-purple-500', category: 'Fashion', icon: <Eye className="h-4 w-4" /> },
    { id: 12, name: 'Wool Fedora Hat', price: 35.00, rating: 4.2, reviews: 56, image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80', tag: 'New', tagColor: 'bg-blue-500', category: 'Fashion', icon: <Gift className="h-4 w-4" /> },
    { id: 13, name: 'Casual Sneakers White', price: 89.99, rating: 4.6, reviews: 234, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80', tag: 'Top Rated', tagColor: 'bg-green-500', category: 'Fashion', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 14, name: 'Leather Wallet Classic', price: 29.99, rating: 4.3, reviews: 78, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80', tag: 'Best Value', tagColor: 'bg-teal-500', category: 'Fashion', icon: <Briefcase className="h-4 w-4" /> },
    { id: 15, name: 'Cashmere Scarf Luxury', price: 55.00, rating: 4.4, reviews: 45, image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80', tag: 'Premium', tagColor: 'bg-amber-700', category: 'Fashion', icon: <Gift className="h-4 w-4" /> },
    { id: 16, name: 'Trench Coat Classic', price: 159.00, rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80', tag: 'Trending', tagColor: 'bg-indigo-500', category: 'Fashion', icon: <Shirt className="h-4 w-4" /> },
    
    // Home & Living
    { id: 17, name: 'Ergonomic Office Chair', price: 249.00, rating: 4.9, reviews: 312, image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&q=80', tag: 'Top Rated', tagColor: 'bg-green-500', category: 'Home & Living', icon: <HomeIcon className="h-4 w-4" /> },
    { id: 18, name: 'Modern Desk Lamp', price: 35.50, rating: 4.6, reviews: 156, image: 'https://images.unsplash.com/photo-1507473885769-1065576a88b8?w=600&q=80', tag: 'Best Value', tagColor: 'bg-teal-500', category: 'Home & Living', icon: <Lamp className="h-4 w-4" /> },
    { id: 19, name: 'Coffee Maker Deluxe', price: 149.99, rating: 4.8, reviews: 278, image: 'https://images.unsplash.com/photo-1517668808822-9f02f4a6fc37?w=600&q=80', tag: 'Top Rated', tagColor: 'bg-green-500', category: 'Home & Living', icon: <Coffee className="h-4 w-4" /> },
    { id: 20, name: 'Designer Vase Set', price: 45.99, rating: 4.3, reviews: 67, image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&q=80', tag: 'New', tagColor: 'bg-blue-500', category: 'Home & Living', icon: <Gift className="h-4 w-4" /> },
    { id: 21, name: 'Decorative Wall Mirror', price: 79.99, rating: 4.5, reviews: 89, image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80', tag: 'Popular', tagColor: 'bg-purple-500', category: 'Home & Living', icon: <Eye className="h-4 w-4" /> },
    { id: 22, name: 'Luxury Sofa Set', price: 899.00, rating: 4.9, reviews: 234, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', tag: 'Premium', tagColor: 'bg-amber-700', category: 'Home & Living', icon: <Sofa className="h-4 w-4" /> },
    
    // Beauty - FIXED ICONS
    { id: 23, name: 'Luxury Perfume', price: 89.99, rating: 4.7, reviews: 189, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80', tag: 'Best Seller', tagColor: 'bg-amber-500', category: 'Beauty', icon: <Gem className="h-4 w-4" /> },
    { id: 24, name: 'Skincare Cream Set', price: 49.99, rating: 4.6, reviews: 145, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', tag: 'Top Rated', tagColor: 'bg-green-500', category: 'Beauty', icon: <Sparkles className="h-4 w-4" /> },
    { id: 25, name: 'Lipstick Collection', price: 29.99, rating: 4.4, reviews: 98, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80', tag: 'Trending', tagColor: 'bg-indigo-500', category: 'Beauty', icon: <Heart className="h-4 w-4" /> },
    { id: 26, name: 'Nail Art Set', price: 24.99, rating: 4.2, reviews: 67, image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&q=80', tag: 'New', tagColor: 'bg-blue-500', category: 'Beauty', icon: <Star className="h-4 w-4" /> },
    
    // Sports
    { id: 27, name: 'Yoga Mat Premium', price: 29.99, rating: 4.5, reviews: 134, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80', tag: 'Popular', tagColor: 'bg-purple-500', category: 'Sports', icon: <Dumbbell className="h-4 w-4" /> },
    { id: 28, name: 'Fitness Tracker Band', price: 59.99, rating: 4.5, reviews: 95, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80', tag: 'Sale', tagColor: 'bg-red-500', category: 'Sports', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 29, name: 'Dumbbell Set 20kg', price: 89.99, rating: 4.6, reviews: 78, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80', tag: 'Best Seller', tagColor: 'bg-amber-500', category: 'Sports', icon: <Dumbbell className="h-4 w-4" /> },
    { id: 30, name: 'Running Shoes Pro', price: 129.99, rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', tag: 'Top Rated', tagColor: 'bg-green-500', category: 'Sports', icon: <TrendingUp className="h-4 w-4" /> },
    
    // Grocery
    { id: 31, name: 'Organic Coffee Beans', price: 18.50, rating: 4.7, reviews: 203, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80', tag: 'Premium', tagColor: 'bg-amber-700', category: 'Grocery', icon: <Coffee className="h-4 w-4" /> },
    { id: 32, name: 'Green Tea Collection', price: 15.99, rating: 4.3, reviews: 89, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&q=80', tag: 'Best Value', tagColor: 'bg-teal-500', category: 'Grocery', icon: <Coffee className="h-4 w-4" /> },
    { id: 33, name: 'Honey Organic Jar', price: 22.99, rating: 4.6, reviews: 156, image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&q=80', tag: 'Popular', tagColor: 'bg-purple-500', category: 'Grocery', icon: <Gift className="h-4 w-4" /> },
    { id: 34, name: 'Spice Gift Set', price: 34.99, rating: 4.4, reviews: 67, image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&q=80', tag: 'New', tagColor: 'bg-blue-500', category: 'Grocery', icon: <Gift className="h-4 w-4" /> },
    
    // Books
    { id: 35, name: 'Bestseller Novel 2026', price: 24.99, rating: 4.8, reviews: 312, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80', tag: 'Best Seller', tagColor: 'bg-amber-500', category: 'Books', icon: <BookOpen className="h-4 w-4" /> },
    { id: 36, name: 'Cookbook Deluxe', price: 34.99, rating: 4.5, reviews: 89, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80', tag: 'Top Rated', tagColor: 'bg-green-500', category: 'Books', icon: <BookOpen className="h-4 w-4" /> },
    { id: 37, name: 'Self-Help Guide', price: 19.99, rating: 4.3, reviews: 145, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80', tag: 'Trending', tagColor: 'bg-indigo-500', category: 'Books', icon: <BookOpen className="h-4 w-4" /> },
    { id: 38, name: 'Kids Story Collection', price: 29.99, rating: 4.7, reviews: 203, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80', tag: 'Popular', tagColor: 'bg-purple-500', category: 'Books', icon: <BookOpen className="h-4 w-4" /> },
  ];

  // Filter products by category
  const getFilteredProducts = () => {
    if (activeCategory === 'All') {
      return allProducts;
    }
    return allProducts.filter(p => p.category === activeCategory);
  };

  // Get products by category for category sections
  const getProductsByCategory = (category) => {
    return allProducts.filter(p => p.category === category).slice(0, 4);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
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

  const filteredProducts = getFilteredProducts();

  // Category sections
  const categorySections = [
    { name: 'Electronics', icon: <Laptop className="h-5 w-5" />, color: 'from-blue-500 to-indigo-600' },
    { name: 'Fashion', icon: <Shirt className="h-5 w-5" />, color: 'from-pink-500 to-rose-600' },
    { name: 'Home & Living', icon: <HomeIcon className="h-5 w-5" />, color: 'from-emerald-500 to-teal-600' },
    { name: 'Beauty', icon: <Gem className="h-5 w-5" />, color: 'from-purple-500 to-violet-600' },
    { name: 'Sports', icon: <Dumbbell className="h-5 w-5" />, color: 'from-orange-500 to-red-600' },
    { name: 'Books', icon: <BookOpen className="h-5 w-5" />, color: 'from-amber-500 to-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      
      {/* ============ 1. HERO SLIDER ============ */}
      <section className="relative bg-white overflow-hidden">
        <div className="relative h-[500px] lg:h-[650px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl text-white space-y-6">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                      {slide.tag}
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-gray-200 max-w-lg drop-shadow-lg">
                      {slide.subtitle}
                    </p>
                    <Link 
                      to={slide.ctaLink}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full hover:scale-105 transition shadow-2xl shadow-amber-500/30"
                    >
                      {slide.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition text-white z-20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition text-white z-20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-8 bg-amber-500' 
                    : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ 2. TRUST INCENTIVES ============ */}
      <section className="bg-white border-y border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Free Shipping</h4>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Secure Payment</h4>
                <p className="text-xs text-gray-500">100% SSL protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-110 transition">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Easy Returns</h4>
                <p className="text-xs text-gray-500">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">4.9 Star Rating</h4>
                <p className="text-xs text-gray-500">From over 10k users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. CATEGORY FILTER ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat.name
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* ============ 4. FEATURED PRODUCTS ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              {activeCategory === 'All' ? '🔥 All Products' : `${activeCategory} Products`}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{filteredProducts.length} products available</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 group">
            View all <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition duration-300 relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <span className={`absolute top-3 left-3 text-white font-bold tracking-tight text-[10px] px-2.5 py-1 rounded-full shadow-lg z-10 uppercase ${product.tagColor}`}>
                {product.tag}
              </span>

              <button 
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg z-10 hover:bg-white transition"
              >
                <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>

              <div className="aspect-square bg-gray-50 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500" 
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-black/40 transition duration-300 flex items-center justify-center gap-2 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                  <button className="p-2 bg-white rounded-full hover:bg-amber-500 hover:text-white transition shadow-lg">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-white rounded-full hover:bg-amber-500 hover:text-white transition shadow-lg">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{product.category}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    {product.rating}
                  </span>
                </div>
                <h3 className="font-medium text-gray-800 line-clamp-1 group-hover:text-amber-600 transition">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition duration-200 ${
                      addedProductId === product.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:scale-105'
                    }`}
                  >
                    {addedProductId === product.id ? '✓ Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 5. CATEGORY SECTIONS ============ */}
      {categorySections.map((section) => {
        const products = getProductsByCategory(section.name);
        if (products.length === 0) return null;
        
        return (
          <section key={section.name} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-gradient-to-r ${section.color} rounded-xl text-white`}>
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{section.name}</h2>
                  <p className="text-xs text-gray-500">{products.length} products</p>
                </div>
              </div>
              <Link to={`/products?category=${section.name}`} className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 group">
                See all <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition"
                >
                  <div className="aspect-square overflow-hidden bg-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-gray-800 line-clamp-1">{product.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm font-bold text-amber-600">${product.price.toFixed(2)}</p>
                      <span className="text-xs text-gray-400 flex items-center gap-0.5">
                        <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* ============ 6. BANNER - DEALS ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600 to-orange-700 p-12 text-center">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80" 
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-white text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="h-3 w-3" /> Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Get 20% Off Your <br className="hidden sm:block" />
              <span className="text-amber-200">First Order</span>
            </h2>
            <p className="text-amber-100 max-w-md mx-auto mb-8">
              Sign up for our newsletter and get 20% off your first purchase
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-amber-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-3 bg-white text-amber-600 font-bold rounded-xl hover:scale-105 transition shadow-lg">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}