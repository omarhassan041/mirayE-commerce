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
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2.5 text-xl font-bold text-white group"
            >
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/25 group-hover:scale-110 transition">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <span>
                Miray<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Market</span>
              </span>
            </Link>
            
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Suuq weynaha internet-ka ee kuu dhow. Quality products at affordable prices.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="p-2.5 bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all duration-300 group"
              >
                <FaFacebook className="h-4 w-4 group-hover:scale-110 transition" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all duration-300 group"
              >
                <FaTwitter className="h-4 w-4 group-hover:scale-110 transition" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all duration-300 group"
              >
                <FaInstagram className="h-4 w-4 group-hover:scale-110 transition" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all duration-300 group"
              >
                <FaYoutube className="h-4 w-4 group-hover:scale-110 transition" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Products' },
                { to: '/categories', label: 'Categories' },
                { to: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-amber-400 transition flex items-center gap-2 group"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-amber-500 opacity-0 group-hover:opacity-100 transition" />
                    <span className="group-hover:translate-x-1 transition">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Account
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: '/profile', label: 'Profile' },
                { to: '/orders', label: 'Orders' },
                { to: '/cart', label: 'Cart' },
                { to: '/wishlist', label: 'Wishlist' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-amber-400 transition flex items-center gap-2 group"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-amber-500 opacity-0 group-hover:opacity-100 transition" />
                    <span className="group-hover:translate-x-1 transition">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400 group">
                <Mail className="h-4 w-4 text-amber-500 mt-0.5 group-hover:scale-110 transition" />
                <span className="group-hover:text-white transition">info@miray.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400 group">
                <Phone className="h-4 w-4 text-amber-500 mt-0.5 group-hover:scale-110 transition" />
                <span className="group-hover:text-white transition">+252 6</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400 group">
                <MapPin className="h-4 w-4 text-amber-500 mt-0.5 group-hover:scale-110 transition" />
                <span className="group-hover:text-white transition">Mogadishu, Somalia</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400 group">
                <Clock className="h-4 w-4 text-amber-500 mt-0.5 group-hover:scale-110 transition" />
                <span className="group-hover:text-white transition">Mon-Sat: 8AM-8PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10 pt-8 border-t border-gray-800">
          <div className="flex items-center gap-2.5 text-sm text-gray-400 group cursor-default">
            <div className="p-2 bg-gray-800 rounded-xl group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 transition">
              <Truck className="h-4 w-4 group-hover:text-white transition" />
            </div>
            <span className="group-hover:text-white transition">Free Shipping</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-gray-400 group cursor-default">
            <div className="p-2 bg-gray-800 rounded-xl group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 transition">
              <ShieldCheck className="h-4 w-4 group-hover:text-white transition" />
            </div>
            <span className="group-hover:text-white transition">Secure Payment</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-gray-400 group cursor-default">
            <div className="p-2 bg-gray-800 rounded-xl group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 transition">
              <RefreshCw className="h-4 w-4 group-hover:text-white transition" />
            </div>
            <span className="group-hover:text-white transition">Easy Returns</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-gray-400 group cursor-default">
            <div className="p-2 bg-gray-800 rounded-xl group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 transition">
              <Star className="h-4 w-4 group-hover:text-white transition" />
            </div>
            <span className="group-hover:text-white transition">4.9 Rating</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 pt-6 border-t border-gray-800/50">
          <p className="text-xs text-gray-500">
            © {currentYear} Miray Market. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="text-gray-500 hover:text-amber-400 transition">
              Privacy Policy
            </a>
            <span className="text-gray-700">|</span>
            <a href="#" className="text-gray-500 hover:text-amber-400 transition">
              Terms of Service
            </a>
            <span className="text-gray-700">|</span>
            <a href="#" className="text-gray-500 hover:text-amber-400 transition">
              Cookies
            </a>
          </div>
          
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 animate-pulse" /> by
            <span className="text-amber-400 font-medium hover:text-amber-300 transition">Omar Hassan Ali</span>
          </p>
        </div>
      </div>
    </footer>
  );
}