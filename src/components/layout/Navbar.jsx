import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  ShoppingCart, 
  Heart, 
  User, 
  Layers, 
  Home, 
  Package, 
  Sparkles,
  Menu,
  X
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setIsOpen(false); // Close menu on scroll
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [window.location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/categories', label: 'Categories', icon: Layers },
    { path: '/about', label: 'About', icon: Sparkles },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-amber-500/10 border-b border-amber-100/50' 
        : 'bg-white/90 backdrop-blur-md border-b border-amber-100/50 shadow-lg shadow-amber-500/5'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          
          {/* Logo - Responsive */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-xl lg:text-2xl font-black tracking-tight text-gray-900 group flex-shrink-0">
            <div className="p-1 sm:p-1.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg sm:rounded-xl shadow-lg shadow-amber-500/25 group-hover:scale-110 transition">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="group-hover:scale-105 transition truncate">
              Miray<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Market</span>
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-gray-600">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-xl hover:bg-amber-50 hover:text-amber-500 transition group"
              >
                <link.icon className="h-4 w-4 group-hover:scale-110 transition" /> 
                <span className="group-hover:translate-x-0.5 transition">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* User Actions & Cart */}
          <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-2">
            {/* Wishlist - Hidden on very small screens */}
            <Link 
              to="/wishlist" 
              className="hidden xs:flex p-1.5 sm:p-2 hover:bg-amber-50 rounded-full transition relative text-gray-600 hover:text-amber-500 group"
            >
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition" />
            </Link>
            
            {/* Cart - Always visible */}
            <Link 
              to="/cart" 
              className="p-1.5 sm:p-2 hover:bg-amber-50 rounded-full transition relative text-gray-600 hover:text-amber-500 group"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[8px] sm:text-[10px] min-w-[16px] sm:min-w-[18px] h-[16px] sm:h-[18px] rounded-full flex items-center justify-center font-bold shadow-lg shadow-amber-500/30 animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* User Profile / Login - Responsive */}
            {user ? (
              <Link 
                to="/profile" 
                className="hidden sm:flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-50 to-orange-50 text-gray-800 text-xs sm:text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-amber-500/20 transition border border-amber-200/50 group"
              >
                <div className="p-0.5 sm:p-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full">
                  <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                </div>
                <span className="group-hover:text-amber-600 transition truncate max-w-[60px] sm:max-w-none">
                  {user.name?.split(' ')[0] || 'User'}
                </span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="hidden xs:flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-medium rounded-xl hover:scale-105 transition shadow-lg shadow-amber-500/30 group"
              >
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition" />
                <span className="hidden sm:inline">Login</span>
                <span className="sm:hidden">Log in</span>
              </Link>
            )}

            {/* Mobile Menu Button - Visible on small screens */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1.5 sm:p-2 hover:bg-amber-50 rounded-xl transition text-gray-600"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white border-t border-gray-100 shadow-lg">
          <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-amber-50 hover:text-amber-500 transition"
                onClick={() => setIsOpen(false)}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Auth Links */}
            <div className="border-t border-gray-100 my-2 pt-2">
              {user ? (
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-amber-50 hover:text-amber-500 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-amber-50 hover:text-amber-500 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white transition shadow-lg shadow-amber-500/30"
                    onClick={() => setIsOpen(false)}
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}