import React, { useState } from 'react';
import { Search, ShoppingCart, User, Moon, Sun, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/Button';
import { AuthModal } from '../auth/AuthModal';
import { CartSidebar } from '../cart/CartSidebar';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function Header({ setCurrentView }: HeaderProps) {
  const { user, signOut } = useAuth();
  const { getItemCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const itemCount = getItemCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('search');
      // In a real app, you'd pass the search query to the search component
    }
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => setCurrentView('home')}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent"
              >
                ShopHub
              </button>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </form>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    <User className="w-6 h-6" />
                    <span className="hidden lg:block">{user.full_name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button
                      onClick={() => setCurrentView('dashboard')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
                    >
                      Dashboard
                    </button>
                    {user.role === 'admin' && (
                      <button
                        onClick={() => setCurrentView('admin')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Admin Panel
                      </button>
                    )}
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Button onClick={() => setShowAuthModal(true)}>
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 text-gray-600 dark:text-gray-300"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 space-y-4">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </form>

              <div className="flex items-center justify-between">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>

                <button
                  onClick={() => setShowCart(true)}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Cart ({itemCount})
                </button>
              </div>

              {user ? (
                <div className="space-y-2">
                  <p className="text-gray-900 dark:text-gray-100">Hello, {user.full_name}</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setCurrentView('dashboard');
                        setShowMobileMenu(false);
                      }}
                      className="block w-full text-left text-gray-600 dark:text-gray-300"
                    >
                      Dashboard
                    </button>
                    {user.role === 'admin' && (
                      <button
                        onClick={() => {
                          setCurrentView('admin');
                          setShowMobileMenu(false);
                        }}
                        className="block w-full text-left text-gray-600 dark:text-gray-300"
                      >
                        Admin Panel
                      </button>
                    )}
                    <button
                      onClick={signOut}
                      className="block w-full text-left text-gray-600 dark:text-gray-300"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Button onClick={() => setShowAuthModal(true)} className="w-full">
                  Sign In
                </Button>
              )}
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
}