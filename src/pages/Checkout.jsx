import React, { useState, useEffect } from 'react';
import { 
  CreditCard, MapPin, ShieldCheck, ArrowRight, 
  Truck, Clock, CheckCircle, Package, 
  ChevronDown, ChevronUp, Wallet, Smartphone,
  X, Plus, Minus, ShoppingBag, Home, Building2,
  Phone, Mail, User, AlertCircle, QrCode,
  Coins, DollarSign
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: 'Mogadishu',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('mobile-money');
  const [mobileMoneyProvider, setMobileMoneyProvider] = useState('evc');
  const [mobileNumber, setMobileNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [edahabNumber, setEdahabNumber] = useState('');
  const [edahabAmount, setEdahabAmount] = useState('');
  const [errors, setErrors] = useState({});

  const deliveryFee = cartTotal > 50 ? 0 : 5.00;
  const total = cartTotal + deliveryFee;

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      navigate('/cart');
    }
  }, [cartItems, navigate, orderPlaced]);

  // Generate random transaction ID
  const generateTransactionId = () => {
    return 'TXN-' + Date.now().toString().slice(-8) + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
  };

  // Validate shipping form
  const validateShipping = () => {
    const newErrors = {};
    if (!shippingInfo.name.trim()) newErrors.name = 'Full name is required';
    if (!shippingInfo.email.trim()) newErrors.email = 'Email is required';
    if (!shippingInfo.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate payment
  const validatePayment = () => {
    if (paymentMethod === 'mobile-money') {
      if (!mobileNumber || mobileNumber.length < 7) {
        setPaymentError('Please enter a valid mobile number');
        return false;
      }
    }
    if (paymentMethod === 'edahab') {
      if (!edahabNumber || edahabNumber.length < 7) {
        setPaymentError('Please enter a valid Edahab number');
        return false;
      }
      if (!edahabAmount || parseFloat(edahabAmount) < total) {
        setPaymentError(`Please enter the correct amount ($${total.toFixed(2)})`);
        return false;
      }
    }
    if (paymentMethod === 'bank') {
      if (!transactionId || transactionId.length < 5) {
        setPaymentError('Please enter a valid transaction reference');
        return false;
      }
    }
    return true;
  };

  // Process payment
  const processPayment = async () => {
    setPaymentProcessing(true);
    setPaymentError('');

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 95% success rate for demo
    const success = Math.random() < 0.95;

    if (success) {
      setPaymentSuccess(true);
      setPaymentProcessing(false);
      return true;
    } else {
      setPaymentError('Payment failed. Please try again or use another method.');
      setPaymentProcessing(false);
      return false;
    }
  };

  // Place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (validateShipping()) {
        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (step === 2) {
      if (validatePayment()) {
        setStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Step 3 - Confirm & Pay
    if (step === 3) {
      setLoading(true);
      
      // Process payment
      const paymentResult = await processPayment();
      
      if (!paymentResult) {
        setLoading(false);
        return;
      }

      // Create order
      const order = {
        id: Date.now(),
        orderNumber: `ORD-${Date.now().toString().slice(-8)}`,
        items: cartItems,
        subtotal: cartTotal,
        deliveryFee: deliveryFee,
        total: total,
        shippingInfo: shippingInfo,
        paymentMethod: paymentMethod,
        paymentDetails: {
          provider: paymentMethod === 'mobile-money' ? mobileMoneyProvider : 
                    paymentMethod === 'edahab' ? 'Edahab' : null,
          mobileNumber: paymentMethod === 'mobile-money' ? mobileNumber : 
                       paymentMethod === 'edahab' ? edahabNumber : null,
          transactionId: paymentMethod === 'bank' ? transactionId : generateTransactionId()
        },
        date: new Date().toISOString(),
        status: 'Paid',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      };

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

      // Clear cart
      clearCart();

      setOrderNumber(order.orderNumber);
      setOrderPlaced(true);
      setLoading(false);

      // Redirect after 5 seconds
      setTimeout(() => {
        navigate('/orders');
      }, 5000);
    }
  };

  // If cart is empty
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center max-w-7xl mx-auto px-4">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
          <p className="text-gray-500 mt-2">Add some items to your cart before checking out.</p>
          <Link to="/products" className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:scale-105 transition">
            Start Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Order placed success
  if (orderPlaced) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center max-w-7xl mx-auto px-4">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl max-w-lg border border-emerald-100/50 animate-fade-in">
          <div className="inline-flex p-4 bg-emerald-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
          <p className="text-gray-500 mt-2">Your order has been placed successfully.</p>
          <div className="mt-4 p-3 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="text-lg font-bold text-amber-600">{orderNumber}</p>
          </div>
          <p className="text-xs text-gray-400 mt-4">Redirecting to orders page...</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/orders" className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:scale-105 transition">
              View Orders
            </Link>
            <Link to="/" className="px-6 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center gap-2 ${step >= s ? 'text-amber-500' : 'text-gray-300'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= s ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              <span className="hidden sm:inline text-sm font-medium">
                {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Confirm'}
              </span>
            </div>
            {s < 3 && (
              <div className={`w-12 h-0.5 mx-2 ${step > s ? 'bg-amber-500' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ============ FORM ============ */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Shipping */}
          <div className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl border transition ${
            step >= 1 ? 'border-amber-100/50 shadow-lg shadow-amber-500/5' : 'border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-amber-500" />
                Shipping Information
              </h2>
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-amber-500 hover:text-amber-600 font-medium"
                >
                  Edit
                </button>
              )}
            </div>

            <div className={`space-y-4 ${step < 1 ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                    placeholder="Omar Hassan Ali"
                    className={`w-full bg-gray-50/80 text-sm px-4 py-3 rounded-xl border transition focus:outline-none focus:ring-4 ${
                      errors.name 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' 
                        : 'border-gray-200 focus:border-amber-500 focus:ring-amber-500/10 focus:bg-white'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    placeholder="omar@gmail.com"
                    className={`w-full bg-gray-50/80 text-sm px-4 py-3 rounded-xl border transition focus:outline-none focus:ring-4 ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' 
                        : 'border-gray-200 focus:border-amber-500 focus:ring-amber-500/10 focus:bg-white'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                    placeholder="+252 61 234 5678"
                    className={`w-full bg-gray-50/80 text-sm px-4 py-3 rounded-xl border transition focus:outline-none focus:ring-4 ${
                      errors.phone 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' 
                        : 'border-gray-200 focus:border-amber-500 focus:ring-amber-500/10 focus:bg-white'
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    placeholder="Mogadishu"
                    className="w-full bg-gray-50/80 text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:bg-white transition"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    placeholder="Hodan, Muqdisho, Somalia"
                    className={`w-full bg-gray-50/80 text-sm px-4 py-3 rounded-xl border transition focus:outline-none focus:ring-4 ${
                      errors.address 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' 
                        : 'border-gray-200 focus:border-amber-500 focus:ring-amber-500/10 focus:bg-white'
                    }`}
                  />
                  {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Delivery Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={shippingInfo.notes}
                    onChange={(e) => setShippingInfo({...shippingInfo, notes: e.target.value})}
                    rows="2"
                    placeholder="Any special instructions for delivery"
                    className="w-full bg-gray-50/80 text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:bg-white transition resize-none"
                  />
                </div>
              </div>

              {step === 1 && (
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:scale-[1.02] transition shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 text-sm"
                >
                  Continue to Payment
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Step 2: Payment */}
          <div className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl border transition ${
            step >= 2 ? 'border-amber-100/50 shadow-lg shadow-amber-500/5' : 'border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-amber-500" />
                Payment Method
              </h2>
              {step > 2 && (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-amber-500 hover:text-amber-600 font-medium"
                >
                  Edit
                </button>
              )}
            </div>

            <div className={`space-y-4 ${step < 2 ? 'opacity-50 pointer-events-none' : ''}`}>
              {/* Payment Error */}
              {paymentError && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {paymentError}
                </div>
              )}

              {/* Payment Methods */}
              <div className="space-y-3">
                {/* Mobile Money */}
                <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                  paymentMethod === 'mobile-money' 
                    ? 'border-amber-500 bg-amber-50/50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    value="mobile-money"
                    checked={paymentMethod === 'mobile-money'}
                    onChange={() => {
                      setPaymentMethod('mobile-money');
                      setPaymentError('');
                    }}
                    className="mt-1 text-amber-500 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-amber-500" />
                      <p className="text-sm font-semibold text-gray-800">Mobile Money</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">EVC Plus / Zaad</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">EVC</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">ZAAD</span>
                  </div>
                </label>

                {paymentMethod === 'mobile-money' && (
                  <div className="pl-10 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setMobileMoneyProvider('evc')}
                        className={`p-2 rounded-lg border text-sm font-medium transition ${
                          mobileMoneyProvider === 'evc'
                            ? 'border-amber-500 bg-amber-50 text-amber-700'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        EVC Plus
                      </button>
                      <button
                        type="button"
                        onClick={() => setMobileMoneyProvider('zaad')}
                        className={`p-2 rounded-lg border text-sm font-medium transition ${
                          mobileMoneyProvider === 'zaad'
                            ? 'border-amber-500 bg-amber-50 text-amber-700'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        Zaad
                      </button>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="61 234 5678"
                        className="w-full bg-gray-50/80 text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:bg-white transition"
                      />
                    </div>
                  </div>
                )}

                {/* Edahab */}
                <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                  paymentMethod === 'edahab' 
                    ? 'border-amber-500 bg-amber-50/50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    value="edahab"
                    checked={paymentMethod === 'edahab'}
                    onChange={() => {
                      setPaymentMethod('edahab');
                      setPaymentError('');
                    }}
                    className="mt-1 text-amber-500 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-emerald-500" />
                      <p className="text-sm font-semibold text-gray-800">Edahab</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Pay with Edahab</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">⭐</span>
                  </div>
                </label>

                {paymentMethod === 'edahab' && (
                  <div className="pl-10 space-y-3">
                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                      <p className="text-xs text-gray-600">Pay with Edahab</p>
                      <p className="text-xs text-gray-500 mt-1">Enter your Edahab number and amount</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">
                          Edahab Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={edahabNumber}
                          onChange={(e) => setEdahabNumber(e.target.value)}
                          placeholder="61 234 5678"
                          className="w-full bg-gray-50/80 text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:bg-white transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">
                          Amount <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={edahabAmount}
                          onChange={(e) => setEdahabAmount(e.target.value)}
                          placeholder={total.toFixed(2)}
                          className="w-full bg-gray-50/80 text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:bg-white transition"
                        />
                        <p className="text-xs text-gray-400 mt-1">Total: ${total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cash on Delivery */}
                <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                  paymentMethod === 'cash' 
                    ? 'border-amber-500 bg-amber-50/50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => {
                      setPaymentMethod('cash');
                      setPaymentError('');
                    }}
                    className="mt-1 text-amber-500 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-emerald-500" />
                      <p className="text-sm font-semibold text-gray-800">Cash on Delivery</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Pay when you receive your order</p>
                  </div>
                </label>

                {/* Bank Transfer */}
                <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                  paymentMethod === 'bank' 
                    ? 'border-amber-500 bg-amber-50/50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={() => {
                      setPaymentMethod('bank');
                      setPaymentError('');
                    }}
                    className="mt-1 text-amber-500 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-500" />
                      <p className="text-sm font-semibold text-gray-800">Bank Transfer</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Direct bank transfer</p>
                  </div>
                </label>

                {paymentMethod === 'bank' && (
                  <div className="pl-10 space-y-3">
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                      <p className="text-xs text-gray-600">Bank: Dahabshiil Bank</p>
                      <p className="text-xs text-gray-600">Account: 1234567890</p>
                      <p className="text-xs text-gray-600">Name: Miray Market</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">
                        Transaction Reference <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="Enter transaction reference"
                        className="w-full bg-gray-50/80 text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:bg-white transition"
                      />
                    </div>
                  </div>
                )}
              </div>

              {step === 2 && (
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:scale-[1.02] transition shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 text-sm"
                >
                  Review Order
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Step 3: Confirm */}
          <div className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl border transition ${
            step >= 3 ? 'border-amber-100/50 shadow-lg shadow-amber-500/5' : 'border-gray-100'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-bold text-gray-800">Confirm Order</h2>
            </div>

            <div className={`space-y-4 ${step < 3 ? 'opacity-50 pointer-events-none' : ''}`}>
              {/* Order Summary */}
              <div className="bg-gray-50/80 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Items</span>
                  <span className="font-medium text-gray-900">{cartItems.length} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery</span>
                  <span className="font-medium text-gray-900">{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {paymentMethod === 'mobile-money' ? `${mobileMoneyProvider.toUpperCase()} (${mobileNumber})` : 
                     paymentMethod === 'edahab' ? `Edahab (${edahabNumber})` :
                     paymentMethod === 'cash' ? 'Cash on Delivery' : 
                     'Bank Transfer'}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-amber-500">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                <ShieldCheck className="h-4 w-4" />
                <span>Your transaction is 100% secure and protected.</span>
              </div>

              <button
                type="submit"
                disabled={loading || paymentProcessing}
                className="relative w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2">
                  {loading || paymentProcessing ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {paymentProcessing ? 'Processing Payment...' : 'Placing Order...'}
                    </>
                  ) : (
                    <>
                      Pay Now
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

        </form>

        {/* ============ ORDER SUMMARY ============ */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-100/50 shadow-2xl shadow-amber-500/5 p-6 space-y-4">
            
            <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-500" />
              Order Summary
            </h3>

            {/* Cart Items */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{item.name}</p>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-gray-500">Qty: {item.quantity || 1}</span>
                      <span className="text-xs font-bold text-amber-600">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1">
                  <Truck className="h-3.5 w-3.5" />
                  Delivery
                </span>
                <span className={`font-medium ${deliveryFee === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span className="text-amber-500">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100/50">
              <div className="flex items-center gap-2 text-xs">
                <Clock className="h-4 w-4 text-amber-500" />
                <div>
                  <p className="font-medium text-gray-700">Estimated Delivery</p>
                  <p className="text-gray-500">3-5 business days</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}