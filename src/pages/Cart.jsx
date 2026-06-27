import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, ShoppingBag, ArrowRight, Plus, Minus, 
  Truck, ShieldCheck, Clock, Heart, Gift, 
  CreditCard, ChevronRight, X, AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    addToCart, 
    updateQuantity, 
    cartCount, 
    cartTotal,
    clearCart 
  } = useCart();
  
  const [removingItem, setRemovingItem] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Calculate totals
  const subtotal = cartTotal;
  const deliveryFee = cartItems.length > 0 && subtotal < 50 ? 5.00 : 0;
  const total = subtotal + deliveryFee;
  const savings = cartItems.length > 0 ? (subtotal * 0.05) : 0; // 5% savings mock

  const handleRemoveItem = (id) => {
    setRemovingItem(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingItem(null);
    }, 300);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }
    updateQuantity(id, newQuantity);
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-gray-50 via-white to-amber-50/30 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Shopping Cart</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {cartItems.length > 0 
                ? `${cartItems.length} items in your cart` 
                : 'Your cart is empty'}
            </p>
          </div>
          {cartItems.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1 transition"
              >
                <Trash2 className="h-4 w-4" />
                Clear Cart
              </button>
              <Link 
                to="/products" 
                className="text-sm text-amber-500 hover:text-amber-600 font-medium flex items-center gap-1 group"
              >
                Continue Shopping
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          )}
        </div>

        {/* ============ EMPTY CART ============ */}
        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl border border-amber-100/50 shadow-2xl shadow-amber-500/5">
            <div className="inline-flex p-6 bg-amber-50 rounded-full mb-6">
              <ShoppingBag className="h-20 w-20 text-amber-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm">
              Looks like you haven't added any items to your cart yet. 
              Start shopping to fill it up!
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3.5 rounded-xl text-sm font-medium hover:scale-105 transition shadow-lg shadow-amber-500/30"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          /* ============ CART WITH ITEMS ============ */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ============ CART ITEMS LIST ============ */}
            <div className="lg:col-span-2 space-y-4">
              {/* Free Shipping Banner */}
              {subtotal > 0 && subtotal < 50 && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100/50 flex items-center gap-3">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">
                      Add <span className="font-bold text-blue-600">${(50 - subtotal).toFixed(2)}</span> more to get free shipping!
                    </p>
                    <div className="w-full h-1.5 bg-blue-200 rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Items */}
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition flex gap-4 items-center ${
                    removingItem === item.id ? 'opacity-0 scale-95 transition-all duration-300' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-800 text-sm md:text-base line-clamp-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">{item.category || 'General'}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span className="text-xs text-emerald-600 font-medium">In Stock</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition flex-shrink-0"
                        title="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                      {/* Price */}
                      <div>
                        <p className="text-lg font-bold text-amber-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400 line-through">
                          {item.originalPrice && `$${(item.originalPrice * item.quantity).toFixed(2)}`}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 border border-gray-200 rounded-xl overflow-hidden">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-amber-50 transition text-gray-500 hover:text-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-amber-50 transition text-gray-500 hover:text-amber-600"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link 
                  to="/products" 
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-500 transition group"
                >
                  <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* ============ ORDER SUMMARY ============ */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-100/50 shadow-2xl shadow-amber-500/5 p-6 space-y-4">
                
                <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-3 text-lg flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-amber-500" />
                  Order Summary
                </h3>

                {/* Items Count */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Items</span>
                  <span className="font-medium text-gray-900">{cartItems.length} items</span>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>

                {/* Delivery Fee */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    Delivery
                  </span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                {/* Savings */}
                {savings > 0 && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}

                {/* Total */}
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-amber-500">${total.toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <Link 
                  to="/checkout" 
                  className="w-full mt-2 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 text-sm group"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                </Link>

                {/* Secure Payment Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2">
                  <ShieldCheck className="h-4 w-4 text-amber-500" />
                  <span>Secure Payment • 100% Protected</span>
                </div>

                {/* Trust Features */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
                  <div className="text-center">
                    <Truck className="h-4 w-4 text-amber-500 mx-auto" />
                    <p className="text-[10px] text-gray-400 mt-1">Free Delivery</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-4 w-4 text-amber-500 mx-auto" />
                    <p className="text-[10px] text-gray-400 mt-1">Fast Shipping</p>
                  </div>
                  <div className="text-center">
                    <Heart className="h-4 w-4 text-amber-500 mx-auto" />
                    <p className="text-[10px] text-gray-400 mt-1">Quality Guarantee</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}
      </div>

      {/* ============ CLEAR CART CONFIRMATION MODAL ============ */}
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
              <h3 className="text-xl font-bold text-gray-900">Clear Cart?</h3>
              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to remove all {cartItems.length} items from your cart?
              </p>
              <p className="text-xs text-red-500 mt-1">
                This action cannot be undone.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearCart}
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