import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { 
  ShoppingBag, 
  Users, 
  Award, 
  Target, 
  Heart, 
  Truck,
  ShieldCheck,
  RefreshCw,
  Star,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Globe,
  Smile,
  Zap,
  Headphones,
  ArrowRight,
  CheckCircle,
  Rocket,
  TrendingUp,
  BadgeCheck,
  Crown,
  FileText,
  MessageCircle
} from 'lucide-react';

// Use react-icons for social media
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

// ========================================
// FadeIn Animation Component
// ========================================
const FadeIn = ({ children, delay = 0, direction = 'up' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const directions = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={directions[direction]}
      animate={inView ? { y: 0, x: 0, opacity: 1 } : directions[direction]}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

// ========================================
// WhatsApp Floating Button Component
// ========================================
const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/252625522"  // ✅ Your   number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
    </motion.a>
  );
};

// ========================================
// Section Header Component
// ========================================
const SectionHeader = ({ icon: Icon, title, subtitle, badge }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full text-amber-700 text-sm font-medium mb-4">
        <Icon className="h-4 w-4" />
        {badge}
      </div>
      <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-gray-600 mt-3 max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
};

// ========================================
// MAIN ABOUT COMPONENT
// ========================================
export default function About() {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>About Us - Miray Market | Somalia's Leading E-Commerce</title>
        <meta name="description" content="Learn about Miray Market, our mission, vision, and the team behind Somalia's leading e-commerce platform. Quality products, affordable prices." />
        <meta property="og:title" content="About Miray Market - Our Story" />
        <meta property="og:description" content="Discover the story behind Miray Market, Somalia's premier online marketplace." />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="Miray Market, about us, e-commerce Somalia, online shopping, Mogadishu" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        
        {/* ======================================== */}
        {/* HERO SECTION - BANNER */}
        {/* ======================================== */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 md:py-32 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 -left-40 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-7xl mx-auto px-4 text-center"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6 backdrop-blur-sm hover:scale-105 transition"
            >
              <Sparkles className="h-4 w-4" />
              <span>✨ About Miray Market</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            >
              We Are The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
                Closest Online Market
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            >
              Miray Market was founded to bring you quality products at affordable prices, 
              using modern technology to make shopping easier.
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-semibold hover:scale-105 transition shadow-xl shadow-amber-500/30">
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ======================================== */}
        {/* STATS SECTION WITH COUNTUP */}
        {/* ======================================== */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { end: 500, suffix: '+', label: 'Happy Customers', delay: 0 },
                { end: 1000, suffix: '+', label: 'Products Sold', delay: 0.2 },
                { end: 4.9, suffix: '★', label: 'Average Rating', decimals: 1, delay: 0.4 },
                { end: 98, suffix: '%', label: 'Satisfaction Rate', delay: 0.6 },
              ].map((stat, index) => (
                <FadeIn key={index} delay={stat.delay}>
                  <div className="text-center p-4 rounded-2xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition group cursor-pointer">
                    <div className="text-3xl font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent group-hover:scale-110 transition">
                      <CountUp 
                        end={stat.end} 
                        duration={2.5} 
                        suffix={stat.suffix}
                        decimals={stat.decimals || 0}
                      />
                    </div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================== */}
        {/* OUR STORY SECTION */}
        {/* ======================================== */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full text-amber-700 text-sm font-medium mb-4">
                    <BadgeCheck className="h-4 w-4" />
                    Our Story
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    From <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                      Humble Beginnings to Growth
                    </span>
                  </h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      Miray Market was founded in <span className="font-semibold text-gray-900">2024</span>, 
                      with the goal of creating an online marketplace where Somalis can buy 
                      quality products from the comfort of their homes.
                    </p>
                    <p>
                      We believe in <span className="font-semibold text-gray-900">quality</span>, 
                      <span className="font-semibold text-gray-900"> trust</span>, and 
                      <span className="font-semibold text-gray-900"> customer satisfaction</span> 
                      as our core values.
                    </p>
                    <p>
                      We are proud to be the first modern e-commerce platform in Somalia, 
                      bringing cutting-edge technology to our community.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-6">
                    {[
                      { icon: Users, value: '500+', label: 'Customers' },
                      { icon: ShoppingBag, value: '1000+', label: 'Products' },
                      { icon: Star, value: '4.9★', label: 'Rating' },
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
                      >
                        <div className="p-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg">
                          <item.icon className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{item.value}</p>
                          <p className="text-xs text-gray-500">{item.label}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Truck, text: 'Free Delivery', sub: 'Across the city', gradient: 'from-amber-100 to-orange-100', color: 'text-amber-600' },
                  { icon: ShieldCheck, text: '100% Secure', sub: 'Safe Payment', gradient: 'from-blue-100 to-indigo-100', color: 'text-blue-600' },
                  { icon: RefreshCw, text: 'Easy Returns', sub: '30 Days Policy', gradient: 'from-green-100 to-emerald-100', color: 'text-green-600' },
                  { icon: Headphones, text: '24/7 Support', sub: "We're Here for You", gradient: 'from-purple-100 to-pink-100', color: 'text-purple-600' },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -5 }}
                      className={`bg-gradient-to-br ${item.gradient} rounded-2xl p-6 h-52 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300`}
                    >
                      <div className="p-4 bg-white/60 rounded-full mb-3">
                        <item.icon className={`h-10 w-10 ${item.color}`} />
                      </div>
                      <p className="font-bold text-gray-900">{item.text}</p>
                      <p className="text-xs text-gray-600">{item.sub}</p>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================== */}
        {/* MISSION & VISION */}
        {/* ======================================== */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeader 
              icon={Crown}
              title="Mission & Vision"
              subtitle="We are committed to providing the best service possible"
              badge="Our Core"
            />

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Target,
                  title: 'Mission',
                  desc: 'To provide our customers with quality products at affordable prices, using modern technology to simplify the shopping experience.',
                  gradient: 'from-amber-500 to-orange-500',
                  bg: 'from-amber-50 to-orange-50',
                  border: 'border-amber-200',
                  color: 'text-amber-600',
                  tag: 'We work with dedication',
                  iconColor: 'from-amber-500 to-orange-500'
                },
                {
                  icon: Globe,
                  title: 'Vision',
                  desc: 'To become the largest online marketplace in Somalia, delivering quality products to all regions of the country.',
                  gradient: 'from-blue-500 to-indigo-500',
                  bg: 'from-blue-50 to-indigo-50',
                  border: 'border-blue-200',
                  color: 'text-blue-600',
                  tag: 'We aim to reach far',
                  iconColor: 'from-blue-500 to-indigo-500'
                },
              ].map((item, index) => (
                <FadeIn key={index} delay={index * 0.2}>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className={`group relative bg-gradient-to-br ${item.bg} p-10 rounded-3xl border-2 ${item.border} hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-2xl group-hover:scale-150 transition"></div>
                    <div className="relative">
                      <div className={`p-4 bg-gradient-to-r ${item.iconColor} rounded-2xl inline-block mb-5 shadow-lg shadow-amber-500/25 group-hover:scale-110 transition`}>
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">{item.desc}</p>
                      <div className={`flex items-center gap-2 mt-6 ${item.color}`}>
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">{item.tag}</span>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================== */}
        {/* VALUES SECTION */}
        {/* ======================================== */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeader 
              icon={Heart}
              title="What We Believe In"
              subtitle="Our principles guide everything we do"
              badge="Our Values"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: Heart, 
                  title: 'Trust', 
                  desc: 'We build trust through transparency and honesty', 
                  gradient: 'from-rose-500 to-pink-500',
                  bg: 'bg-rose-50'
                },
                { 
                  icon: Award, 
                  title: 'Quality', 
                  desc: 'We deliver only the highest quality products', 
                  gradient: 'from-amber-500 to-orange-500',
                  bg: 'bg-amber-50'
                },
                { 
                  icon: Smile, 
                  title: 'Satisfaction', 
                  desc: 'Customer satisfaction is our top priority', 
                  gradient: 'from-emerald-500 to-green-500',
                  bg: 'bg-emerald-50'
                },
                { 
                  icon: Zap, 
                  title: 'Speed', 
                  desc: 'Fast and reliable service you can count on', 
                  gradient: 'from-violet-500 to-purple-500',
                  bg: 'bg-violet-50'
                },
              ].map((value, index) => {
                const Icon = value.icon;
                return (
                  <FadeIn key={index} delay={index * 0.1}>
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -10 }}
                      className="group p-8 bg-white rounded-3xl border-2 border-gray-100 hover:border-amber-200 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    >
                      <div className={`p-4 ${value.bg} rounded-2xl inline-block mb-4 group-hover:scale-110 transition`}>
                        <Icon className={`h-7 w-7 bg-gradient-to-r ${value.gradient} bg-clip-text text-transparent`} />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h4>
                      <p className="text-gray-500 text-sm">{value.desc}</p>
                    </motion.div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ======================================== */}
        {/* TEAM SECTION */}
        {/* ======================================== */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeader 
              icon={Users}
              title="The People Behind Miray Market"
              subtitle="We are a skilled team specializing in modern e-commerce solutions"
              badge="Our Team"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Omar Hassan Ali', role: 'Founder & CEO', emoji: '👨‍💼', gradient: 'from-amber-400 to-orange-400', highlight: true },
                { name: 'Fatima Ali', role: 'Head of Operations', emoji: '👩‍💼', gradient: 'from-blue-400 to-indigo-400', highlight: false },
                { name: 'Mohamed Omar', role: 'Marketing Director', emoji: '👨‍💻', gradient: 'from-green-400 to-emerald-400', highlight: false },
                { name: 'Safia Abdi', role: 'Customer Support', emoji: '👩‍💻', gradient: 'from-purple-400 to-pink-400', highlight: false },
              ].map((member, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <motion.div 
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`group text-center p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer ${
                      member.highlight 
                        ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300 shadow-xl hover:shadow-2xl' 
                        : 'bg-white border-gray-100 hover:shadow-2xl hover:border-amber-200'
                    }`}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`text-6xl mb-4 bg-gradient-to-br ${member.gradient} p-6 rounded-3xl inline-block shadow-lg`}
                    >
                      {member.emoji}
                    </motion.div>
                    <h4 className={`font-bold text-lg ${member.highlight ? 'text-amber-700' : 'text-gray-900'}`}>{member.name}</h4>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    {member.highlight && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full"
                      >
                        <Crown className="h-3 w-3" />
                        Founder
                      </motion.div>
                    )}
                    <div className="flex justify-center gap-2 mt-4">
                      <div className={`w-2 h-2 ${member.highlight ? 'bg-amber-400' : 'bg-gray-300'} rounded-full`}></div>
                      <div className={`w-2 h-2 ${member.highlight ? 'bg-amber-400' : 'bg-gray-300'} rounded-full`}></div>
                      <div className={`w-2 h-2 ${member.highlight ? 'bg-amber-400' : 'bg-gray-300'} rounded-full`}></div>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================== */}
        {/* WHY CHOOSE US */}
        {/* ======================================== */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeader 
              icon={TrendingUp}
              title="Why Choose Miray Market?"
              badge="Why Choose Us"
            />

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Truck, title: 'Free Delivery', desc: 'Free shipping on all orders across the city', gradient: 'from-amber-500 to-orange-500' },
                { icon: ShieldCheck, title: 'Secure Payment', desc: 'All transactions are fully protected', gradient: 'from-blue-500 to-indigo-500' },
                { icon: Headphones, title: '24/7 Support', desc: 'We are always here to help you', gradient: 'from-emerald-500 to-green-500' },
              ].map((item, index) => (
                <FadeIn key={index} delay={index * 0.2}>
                  <motion.div 
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="p-8 bg-white rounded-3xl border-2 border-gray-100 hover:border-amber-200 hover:shadow-2xl transition-all duration-300 text-center group cursor-pointer"
                  >
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`p-4 bg-gradient-to-r ${item.gradient} rounded-2xl inline-block mb-5 shadow-lg shadow-amber-500/25 group-hover:scale-110 transition`}
                    >
                      <item.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================== */}
        {/* CONTACT / CTA SECTION WITH SOCIAL MEDIA & NEWSLETTER */}
        {/* ======================================== */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-4">
                  <Mail className="h-4 w-4" />
                  Get in Touch
                </div>
                <h2 className="text-4xl font-bold">Contact Us</h2>
                <p className="text-gray-400 mt-3">We'd love to hear from you</p>
              </div>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: 'support@miraymarket.com' },
                  { icon: Phone, label: 'Phone', value: '+252625522' },
                  { icon: MapPin, label: 'Address', value: 'Mogadishu, Somalia' },
                  { icon: Clock, label: 'Working Hours', value: 'Mon - Sat: 8:00 AM - 8:00 PM' },
                ].map((item, index) => (
                  <FadeIn key={index} delay={index * 0.1}>
                    <motion.div 
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition cursor-pointer"
                    >
                      <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500/20 rounded-xl">
                        <item.icon className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </motion.div>
                  </FadeIn>
                ))}

                {/* Social Media Links - FIXED with react-icons */}
                <FadeIn delay={0.4}>
                  <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                    <p className="text-sm text-gray-400 mb-3">Follow Us</p>
                    <div className="flex gap-3">
                      <motion.a
                        whileHover={{ scale: 1.2, y: -3 }}
                        href="https://facebook.com/miraymarket"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 rounded-xl hover:bg-blue-600 transition border border-white/10"
                      >
                        <FaFacebook className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2, y: -3 }}
                        href="https://twitter.com/miraymarket"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 rounded-xl hover:bg-sky-500 transition border border-white/10"
                      >
                        <FaTwitter className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2, y: -3 }}
                        href="https://instagram.com/miraymarket"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 rounded-xl hover:bg-pink-600 transition border border-white/10"
                      >
                        <FaInstagram className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2, y: -3 }}
                        href="https://youtube.com/miraymarket"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 rounded-xl hover:bg-red-600 transition border border-white/10"
                      >
                        <FaYoutube className="h-5 w-5" />
                      </motion.a>
                    </div>
                  </div>
                </FadeIn>

                {/* Newsletter Subscription */}
                <FadeIn delay={0.5}>
                  <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl border border-amber-500/20">
                    <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                    <p className="text-gray-400 text-sm mb-4">Get updates on new products and special offers</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="flex-1 px-4 py-3 bg-white/10 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 text-white placeholder-gray-400"
                      />
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-semibold whitespace-nowrap shadow-lg shadow-amber-500/30"
                      >
                        Subscribe
                      </motion.button>
                    </div>
                  </div>
                </FadeIn>
              </div>

              <FadeIn direction="left" delay={0.3}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
                  <h3 className="font-bold text-xl mb-6">Send Us a Message</h3>
                  <form className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-gray-400 transition"
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-gray-400 transition"
                    />
                    <textarea 
                      rows="4" 
                      placeholder="Your Message" 
                      className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-gray-400 transition"
                    />
                    
                    {/* Download Brochure Button */}
                    <div className="flex gap-3">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        type="submit"
                        className="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-semibold hover:scale-105 transition shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                      >
                        Send Message <ArrowRight className="h-4 w-4" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        type="button"
                        onClick={() => window.open('/brochure.pdf', '_blank')}
                        className="px-4 py-3.5 bg-amber-500/20 border border-amber-500/30 rounded-xl hover:bg-amber-500/30 transition flex items-center justify-center"
                      >
                        <FileText className="h-5 w-5 text-amber-400" />
                      </motion.button>
                    </div>
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ======================================== */}
        {/* WHATSAPP FLOATING BUTTON */}
        {/* ======================================== */}
        <WhatsAppButton />

      </div>
    </>
  );
}