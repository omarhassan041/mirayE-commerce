import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Clock,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  Star,
  ChevronRight,
} from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-10">
        
        {/* Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Column 1: Brand - Center on mobile */}
          <div className="text-center sm:text-left">
            <Link
              to="/"
              className="flex items-center justify-center sm:justify-start gap-2 text-lg sm:text-xl font-bold text-white"
            >
              <ShoppingBag className="h-5 w-5 text-amber-500" />
              <span>
                Miray<span className="text-amber-500">Market</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed max-w-xs mx-auto sm:mx-0">
              Suuq weynaha internet-ka ee kuu dhow. Quality products at affordable prices.
            </p>
            <div className="flex justify-center sm:justify-start gap-2 mt-3">
              <a
                href="#"
                className="p-1.5 sm:p-2 bg-gray-800 rounded-lg hover:bg-amber-500 hover:text-white transition"
              >
                <FaFacebook className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
              <a
                href="#"
                className="p-1.5 sm:p-2 bg-gray-800 rounded-lg hover:bg-amber-500 hover:text-white transition"
              >
                <FaTwitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
              <a
                href="#"
                className="p-1.5 sm:p-2 bg-gray-800 rounded-lg hover:bg-amber-500 hover:text-white transition"
              >
                <FaInstagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
              <a
                href="#"
                className="p-1.5 sm:p-2 bg-gray-800 rounded-lg hover:bg-amber-500 hover:text-white transition"
              >
                <FaYoutube className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Links - Center on mobile */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold text-xs sm:text-sm uppercase mb-3">
              Quick Links
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition flex items-center justify-center sm:justify-start gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-white transition flex items-center justify-center sm:justify-start gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-white transition flex items-center justify-center sm:justify-start gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition flex items-center justify-center sm:justify-start gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Account - Center on mobile */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold text-xs sm:text-sm uppercase mb-3">
              Account
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/profile"
                  className="hover:text-white transition flex items-center justify-center sm:justify-start gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="hover:text-white transition flex items-center justify-center sm:justify-start gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-white transition flex items-center justify-center sm:justify-start gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-white transition flex items-center justify-center sm:justify-start gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact - Center on mobile */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold text-xs sm:text-sm uppercase mb-3">
              Contact
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" />
                <span>info@miray.com</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" />
                <span>+252 6</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" />
                <span>Mogadishu, Somalia</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" />
                <span>Mon-Sat: 8AM-8PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges - Responsive */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 pt-6 border-t border-gray-800 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500" />
            <span>Easy Returns</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500" />
            <span>4.9 Rating</span>
          </div>
        </div>

        {/* Copyright - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 border-t border-gray-800 text-[10px] sm:text-xs text-gray-500">
          <p>© {currentYear} Miray Market. All rights reserved.</p>
          
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <span className="text-gray-700">|</span>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <span className="text-gray-700">|</span>
            <a href="#" className="hover:text-white transition">
              Cookies
            </a>
          </div>
          
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-500 fill-red-500 animate-pulse" /> by
            <span className="text-amber-400 font-medium hover:text-amber-300 transition">
              Omar
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}