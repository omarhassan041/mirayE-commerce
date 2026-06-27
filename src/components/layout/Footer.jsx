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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grid 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-bold text-white"
            >
              <ShoppingBag className="h-5 w-5 text-amber-500" />
              <span>
                Miray<span className="text-amber-500">Market</span>
              </span>
            </Link>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Suuq weynaha internet-ka ee kuu dhow.
            </p>
            <div className="flex gap-2 mt-3">
              <a
                href="#"
                className="p-1.5 bg-gray-800 rounded-lg hover:bg-amber-500 hover:text-white transition"
              >
                <FaFacebook className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                className="p-1.5 bg-gray-800 rounded-lg hover:bg-amber-500 hover:text-white transition"
              >
                <FaTwitter className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                className="p-1.5 bg-gray-800 rounded-lg hover:bg-amber-500 hover:text-white transition"
              >
                <FaInstagram className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                className="p-1.5 bg-gray-800 rounded-lg hover:bg-amber-500 hover:text-white transition"
              >
                <FaYoutube className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase mb-3">
              Links
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Account */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase mb-3">
              Account
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link
                  to="/profile"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 text-amber-500" />
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase mb-3">
              Contact
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-amber-500" />
                info@miray.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-amber-500" />
                +252 6
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-amber-500" />
                Mogadishu
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-amber-500" />
                Mon-Sat: 8AM-8PM
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-gray-800 text-xs">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Truck className="h-3.5 w-3.5 text-amber-500" />
            Free Shipping
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
            Secure Payment
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <RefreshCw className="h-3.5 w-3.5 text-amber-500" />
            Easy Returns
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Star className="h-3.5 w-3.5 text-amber-500" />
            4.9 Rating
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-4 pt-4 border-t border-gray-800 text-xs text-gray-500">
          <p>© {currentYear} Miray Market. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">
              Cookies
            </a>
          </div>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by
            OMAR H.ALI
          </p>
        </div>
      </div>
    </footer>
  );
}
