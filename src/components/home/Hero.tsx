import React from 'react';
import { Search, ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroProps {
  onNavigateToProducts: () => void;
}

export function Hero({ onNavigateToProducts }: HeroProps) {
  return (
    <div className="relative">
      {/* Main Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-gray-100">Shop the</span>{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                    Future
                  </span>
                  <br />
                  <span className="text-gray-900 dark:text-gray-100">Today</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Discover amazing products at unbeatable prices. From cutting-edge tech to everyday essentials, 
                  find everything you need with fast, free shipping.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onNavigateToProducts}
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Browse Categories
                </Button>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-8 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">Fast Delivery</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Same-day shipping</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">Secure Payment</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">100% protected</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <Truck className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">Free Returns</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">30-day policy</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-emerald-500/20 rounded-3xl transform rotate-3"></div>
              <img
                src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Shopping Experience"
                className="relative z-10 w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 z-20 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">Order Placed</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Just now</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 z-20 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">50% Off</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Limited time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              What are you looking for?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Search from thousands of products
            </p>
          </div>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="flex">
              <input
                type="text"
                placeholder="Search for products, brands, and more..."
                className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-l-xl focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
              <Button className="px-8 py-4 rounded-l-none rounded-r-xl text-lg">
                <Search className="w-6 h-6" />
              </Button>
            </div>
            
            {/* Popular Searches */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Popular:</span>
              {['Headphones', 'Smartwatch', 'Laptop', 'Gaming'].map((term) => (
                <button
                  key={term}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}