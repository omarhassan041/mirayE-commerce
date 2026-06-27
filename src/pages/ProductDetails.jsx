import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, 
  Heart, Share2, Eye, ChevronLeft, ChevronRight,
  CheckCircle, Clock, Package, Award, Zap, Sparkles,
  Minus, Plus, X
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // All Products Data (same as in Home)
  const allProducts = [
    // Electronics
    { id: 1, name: 'Premium Wireless Headphones Pro', price: 129.99, rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'], tag: 'Best Seller', tagColor: 'bg-amber-500', category: 'Electronics', description: 'Premium wireless headphones with active noise cancellation, 40-hour battery life, and superior sound quality. Perfect for music lovers and professionals.', features: ['Active Noise Cancellation', '40 Hour Battery', 'Bluetooth 5.0', 'Comfortable Ear Cushions'], stock: 45 },
    { id: 2, name: 'Smartphone Ultra Max', price: 999.99, rating: 4.9, reviews: 456, image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80', images: ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80'], tag: 'New', tagColor: 'bg-blue-600', category: 'Electronics', description: 'The latest smartphone with 6.8" display, 108MP camera, 5000mAh battery, and 5G support. Experience the future of mobile technology.', features: ['6.8" Display', '108MP Camera', '5000mAh Battery', '5G Support'], stock: 12 },
    { id: 3, name: 'Smart Watch Series 8', price: 349.00, rating: 4.7, reviews: 234, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80', images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80'], tag: 'Top Rated', tagColor: 'bg-green-500', category: 'Electronics', description: 'Advanced smartwatch with health monitoring, GPS, heart rate sensor, and 7-day battery life. Stay connected and healthy.', features: ['Health Monitoring', 'GPS', 'Heart Rate Sensor', '7-Day Battery'], stock: 28 },
    { id: 4, name: 'Wireless Earbuds Pro', price: 79.99, rating: 4.7, reviews: 210, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=80', images: ['https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=80', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80'], tag: 'Popular', tagColor: 'bg-purple-500', category: 'Electronics', description: 'True wireless earbuds with immersive sound, noise isolation, and compact charging case. Perfect for on-the-go listening.', features: ['Immersive Sound', 'Noise Isolation', 'Compact Charging Case', '24-Hour Battery'], stock: 67 },
    { id: 5, name: 'Gaming Laptop Pro', price: 1499.99, rating: 4.9, reviews: 189, image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&q=80', images: ['https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&q=80', 'https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?w=600&q=80'], tag: 'Premium', tagColor: 'bg-amber-700', category: 'Electronics', description: 'High-performance gaming laptop with RTX 4080, 32GB RAM, 1TB SSD, and 165Hz display. Ultimate gaming experience.', features: ['RTX 4080 GPU', '32GB RAM', '1TB SSD', '165Hz Display'], stock: 8 },
    { id: 6, name: '4K Camera DSLR', price: 799.00, rating: 4.8, reviews: 167, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80', images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80', 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=600&q=80'], tag: 'Best Value', tagColor: 'bg-teal-500', category: 'Electronics', description: 'Professional 4K DSLR camera with 24MP sensor, 4K video, and versatile lens system. Capture your moments in stunning detail.', features: ['24MP Sensor', '4K Video', 'Versatile Lens System', 'WiFi Connectivity'], stock: 15 },
    { id: 7, name: 'Bluetooth Speaker Boom', price: 89.99, rating: 4.6, reviews: 145, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80', images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80', 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc6?w=600&q=80'], tag: 'Trending', tagColor: 'bg-indigo-500', category: 'Electronics', description: 'Powerful Bluetooth speaker with 360° sound, 20-hour battery, and waterproof design. Perfect for parties and outdoor adventures.', features: ['360° Sound', '20-Hour Battery', 'Waterproof', 'Bluetooth 5.0'], stock: 34 },
    { id: 8, name: 'Drone 4K Pro', price: 599.00, rating: 4.7, reviews: 98, image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&q=80', images: ['https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&q=80', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80'], tag: 'New', tagColor: 'bg-blue-500', category: 'Electronics', description: 'Professional 4K drone with GPS, obstacle avoidance, and 30-minute flight time. Capture breathtaking aerial footage.', features: ['4K Camera', 'GPS', 'Obstacle Avoidance', '30-Min Flight'], stock: 22 },
    
    // Fashion
    { id: 9, name: 'Classic Denim Jacket', price: 75.00, rating: 4.4, reviews: 67, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80', images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80', 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=600&q=80'], tag: 'Trending', tagColor: 'bg-indigo-500', category: 'Fashion', description: 'Timeless classic denim jacket with a modern fit. Made from premium cotton for comfort and durability.', features: ['Premium Cotton', 'Modern Fit', 'Timeless Design', 'Machine Washable'], stock: 56 },
    { id: 10, name: 'Leather Backpack Premium', price: 65.00, rating: 4.3, reviews: 89, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80'], tag: 'Best Seller', tagColor: 'bg-amber-500', category: 'Fashion', description: 'Handcrafted leather backpack with multiple compartments, adjustable straps, and premium hardware. Perfect for daily use.', features: ['Handcrafted', 'Multiple Compartments', 'Adjustable Straps', 'Premium Hardware'], stock: 43 },
    { id: 11, name: 'Designer Sunglasses', price: 45.00, rating: 4.5, reviews: 112, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80'], tag: 'Popular', tagColor: 'bg-purple-500', category: 'Fashion', description: 'Stylish designer sunglasses with UV protection, lightweight frame, and timeless design. Protect your eyes in style.', features: ['UV Protection', 'Lightweight Frame', 'Timeless Design', 'Polarized Lenses'], stock: 78 },
    { id: 12, name: 'Casual Sneakers White', price: 89.99, rating: 4.6, reviews: 234, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80', images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80'], tag: 'Top Rated', tagColor: 'bg-green-500', category: 'Fashion', description: 'Comfortable white sneakers with cushioned soles, breathable material, and versatile style. Perfect for everyday wear.', features: ['Cushioned Soles', 'Breathable Material', 'Versatile Style', 'Lightweight'], stock: 89 },
    { id: 13, name: 'Trench Coat Classic', price: 159.00, rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80', images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80', 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80'], tag: 'Premium', tagColor: 'bg-amber-700', category: 'Fashion', description: 'Elegant classic trench coat with belt, double-breasted design, and water-resistant fabric. Timeless style for any occasion.', features: ['Water-Resistant', 'Double-Breasted', 'Belt Included', 'Timeless Style'], stock: 34 },
    
    // Home & Living
    { id: 14, name: 'Ergonomic Office Chair', price: 249.00, rating: 4.9, reviews: 312, image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&q=80', images: ['https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&q=80', 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80'], tag: 'Top Rated', tagColor: 'bg-green-500', category: 'Home & Living', description: 'Premium ergonomic office chair with lumbar support, adjustable height, and breathable mesh back. Work in comfort all day.', features: ['Lumbar Support', 'Adjustable Height', 'Breathable Mesh', '360° Swivel'], stock: 67 },
    { id: 15, name: 'Coffee Maker Deluxe', price: 149.99, rating: 4.8, reviews: 278, image: 'https://images.unsplash.com/photo-1517668808822-9f02f4a6fc37?w=600&q=80', images: ['https://images.unsplash.com/photo-1517668808822-9f02f4a6fc37?w=600&q=80', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80'], tag: 'Best Seller', tagColor: 'bg-amber-500', category: 'Home & Living', description: 'Deluxe coffee maker with programmable settings, thermal carafe, and built-in grinder. Enjoy perfect coffee every morning.', features: ['Programmable', 'Thermal Carafe', 'Built-in Grinder', 'Auto Shut-off'], stock: 45 },
    { id: 16, name: 'Luxury Sofa Set', price: 899.00, rating: 4.9, reviews: 234, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', 'https://images.unsplash.com/photo-1493663284031-b7e3aefc0578?w=600&q=80'], tag: 'Premium', tagColor: 'bg-amber-700', category: 'Home & Living', description: 'Luxury 3-piece sofa set with premium fabric, memory foam cushions, and modern design. The centerpiece of any living room.', features: ['Premium Fabric', 'Memory Foam', 'Modern Design', 'Durable Frame'], stock: 12 },
    { id: 17, name: 'Modern Desk Lamp', price: 35.50, rating: 4.6, reviews: 156, image: 'https://images.unsplash.com/photo-1507473885769-1065576a88b8?w=600&q=80', images: ['https://images.unsplash.com/photo-1507473885769-1065576a88b8?w=600&q=80', 'https://images.unsplash.com/photo-1534073737927-85f1ebff1f5d?w=600&q=80'], tag: 'Best Value', tagColor: 'bg-teal-500', category: 'Home & Living', description: 'Modern minimalist desk lamp with adjustable arm, dimmable LED, and sleek design. Perfect for work or reading.', features: ['Adjustable Arm', 'Dimmable LED', 'Sleek Design', 'Energy Efficient'], stock: 89 },
    
    // Beauty
    { id: 18, name: 'Luxury Perfume', price: 89.99, rating: 4.7, reviews: 189, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80', images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80', 'https://images.unsplash.com/photo-1523293182086-5b47b6be5d1a?w=600&q=80'], tag: 'Best Seller', tagColor: 'bg-amber-500', category: 'Beauty', description: 'Luxury Eau de Parfum with long-lasting fragrance, elegant bottle, and notes of bergamot, jasmine, and sandalwood.', features: ['Long-Lasting', 'Elegant Bottle', 'Premium Ingredients', 'Unisex'], stock: 34 },
    { id: 19, name: 'Skincare Cream Set', price: 49.99, rating: 4.6, reviews: 145, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', 'https://images.unsplash.com/photo-1556228452-2d6e09f2a8b3?w=600&q=80'], tag: 'Top Rated', tagColor: 'bg-green-500', category: 'Beauty', description: 'Complete skincare set with moisturizer, serum, and eye cream. Formulated with natural ingredients for radiant skin.', features: ['Natural Ingredients', 'Moisturizing', 'Anti-Aging', 'Dermatologist Tested'], stock: 56 },
    { id: 20, name: 'Lipstick Collection', price: 29.99, rating: 4.4, reviews: 98, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80', images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80', 'https://images.unsplash.com/photo-1522125670776-3c317abbd3ab?w=600&q=80'], tag: 'Trending', tagColor: 'bg-indigo-500', category: 'Beauty', description: 'Set of 5 premium lipsticks in various shades. Long-wearing, moisturizing, and richly pigmented.', features: ['Long-Wearing', 'Moisturizing', 'Richly Pigmented', '5 Shades'], stock: 78 },
  ];

  // Fetch product data
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const foundProduct = allProducts.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        // Get related products (same category)
        const related = allProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  // Load wishlist from localStorage
  useEffect(() => {
    const wishlistData = localStorage.getItem('wishlist');
    if (wishlistData) {
      setWishlist(JSON.parse(wishlistData));
    }
  }, []);

  const toggleWishlist = (productId) => {
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }
  };

  const increaseQuantity = () => {
    if (quantity < (product?.stock || 10)) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  // If product not found
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center max-w-7xl mx-auto px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
          <p className="text-gray-500 mt-2">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Back Button */}
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-600 transition group mb-6">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-amber-100/50 shadow-2xl shadow-amber-500/5 p-6 lg:p-8">
        
        {/* ============ LEFT - IMAGE GALLERY ============ */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden group">
            <img 
              src={product.images?.[selectedImage] || product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            
            {/* Tag */}
            {product.tag && (
              <span className={`absolute top-4 left-4 text-white font-bold tracking-tight text-xs px-3 py-1.5 rounded-full shadow-lg ${product.tagColor}`}>
                {product.tag}
              </span>
            )}

            {/* Wishlist Button */}
            <button 
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition"
            >
              <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </button>

            {/* Share Button */}
            <button className="absolute bottom-4 right-4 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition">
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === index ? 'border-amber-500 shadow-lg' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ============ RIGHT - PRODUCT INFO ============ */}
        <div className="flex flex-col space-y-6">
          
          {/* Category */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Package className="h-3.5 w-3.5" />
              In Stock: {product.stock || '50'} units
            </span>
          </div>

          {/* Product Name */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="h-4 w-4 fill-current" />
              <span>{product.rating}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">({product.reviews || '1.2k'} reviews)</span>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1 text-emerald-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-xs font-medium">Verified</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-4xl font-black text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            {product.discount && (
              <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Save {product.discount}%
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
            {product.description || 'High-quality product with premium features. Perfect for your daily needs.'}
          </p>

          {/* Features */}
          {product.features && (
            <div className="grid grid-cols-2 gap-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="h-3.5 w-3.5 text-amber-500" />
                  {feature}
                </div>
              ))}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="p-2.5 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-bold">{quantity}</span>
              <button
                onClick={increaseQuantity}
                disabled={quantity >= (product.stock || 10)}
                className="p-2.5 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-xs text-gray-400">
              {product.stock || 50} available
            </span>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            className={`relative w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 group overflow-hidden`}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2">
              {addedToCart ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition" />
                  Add to Cart
                </>
              )}
            </span>
          </button>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Truck className="h-4 w-4 text-amber-500" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="h-4 w-4 text-amber-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-4 w-4 text-amber-500" />
              <span>24/7 Support</span>
            </div>
          </div>

        </div>
      </div>

      {/* ============ RELATED PRODUCTS ============ */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                You May Also Like
              </h2>
              <p className="text-sm text-gray-500">Similar products you might be interested in</p>
            </div>
            <Link to="/products" className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 group">
              View All <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((related) => (
              <Link 
                key={related.id} 
                to={`/product/${related.id}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img 
                    src={related.image} 
                    alt={related.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500">{related.category}</p>
                  <p className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-amber-600 transition">
                    {related.name}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm font-bold text-amber-600">${related.price.toFixed(2)}</p>
                    <div className="flex items-center gap-0.5 text-xs text-amber-500">
                      <Star className="h-3 w-3 fill-current" />
                      {related.rating}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}