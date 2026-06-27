import { Link } from "react-router-dom";
import { ShoppingBag, ShoppingCart, Heart, User, Layers, Home, Package, Sparkles } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user } = useAuth();

  return (
   <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100/50 shadow-lg shadow-amber-500/5">
  <div className="max-w-7xl mx-auto flex justify-between items-center px-2 sm:px-4 lg:px-8 h-12 sm:h-14 md:h-16 lg:h-20">
    
       {/* Logo - Responsive */}
<Link to="/" className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-xl lg:text-2xl font-black tracking-tight text-gray-900 group flex-shrink-0">
  <div className="p-1 sm:p-1.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg sm:rounded-xl shadow-lg shadow-amber-500/25 group-hover:scale-110 transition">
    <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
  </div>
  <span className="group-hover:scale-105 transition truncate">
    Miray<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Market</span>
  </span>
</Link>

   {/* Links - Icons Only on Mobile, Full Text on Tablet+ */}
<div className="flex items-center gap-1.5 sm:gap-4 md:gap-6 text-xs sm:text-sm font-medium text-gray-600">
  
  <Link to="/" className="flex items-center gap-1 hover:text-amber-500 transition group">
    <Home className="h-3.5 sm:h-4 w-3.5 sm:w-4 group-hover:scale-110 transition" /> 
    <span className="group-hover:translate-x-0.5 transition hidden sm:inline">Home</span>
  </Link>
  
  <Link to="/products" className="flex items-center gap-1 hover:text-amber-500 transition group">
    <Package className="h-3.5 sm:h-4 w-3.5 sm:w-4 group-hover:scale-110 transition" /> 
    <span className="group-hover:translate-x-0.5 transition hidden sm:inline">Products</span>
  </Link>
  
  <Link to="/categories" className="flex items-center gap-1 hover:text-amber-500 transition group">
    <Layers className="h-3.5 sm:h-4 w-3.5 sm:w-4 group-hover:scale-110 transition" /> 
    <span className="group-hover:translate-x-0.5 transition hidden sm:inline">Categories</span>
  </Link>
  
  <Link to="/about" className="flex items-center gap-1 hover:text-amber-500 transition group">
    <Sparkles className="h-3.5 sm:h-4 w-3.5 sm:w-4 group-hover:scale-110 transition" /> 
    <span className="group-hover:translate-x-0.5 transition hidden sm:inline">About</span>
  </Link>
</div>

        {/* User Actions & Cart */}
        <div className="flex items-center gap-2">
          {/* Wishlist */}
          <Link to="/wishlist" className="p-2 hover:bg-amber-50 rounded-full transition relative text-gray-600 hover:text-amber-500 group">
            <Heart className="h-5 w-5 group-hover:scale-110 transition" />
          </Link>
          
          {/* Cart */}
          <Link to="/cart" className="p-2 hover:bg-amber-50 rounded-full transition relative text-gray-600 hover:text-amber-500 group">
            <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold shadow-lg shadow-amber-500/30 animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* User Profile / Login - Amber Gradient */}
          {user ? (
            <Link to="/profile" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 text-gray-800 text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-amber-500/20 transition border border-amber-200/50 group">
              <div className="p-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full">
                <User className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="group-hover:text-amber-600 transition">{user.name.split(' ')[0]}</span>
            </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-xl hover:scale-105 transition shadow-lg shadow-amber-500/30 group">
              <User className="h-4 w-4 group-hover:scale-110 transition" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}