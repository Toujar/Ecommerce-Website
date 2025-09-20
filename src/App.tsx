import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { Hero } from './components/home/Hero';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { Categories } from './components/home/Categories';
import { ProductCatalog } from './components/products/ProductCatalog';
import { ProductDetails } from './components/products/ProductDetails';
import { Dashboard } from './components/user/Dashboard';
import { AdminPanel } from './components/admin/AdminPanel';
import { ToastContainer } from './components/ui/Toast';
import { Product } from './types';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-details');
  };

  const handleBackToProducts = () => {
    setCurrentView('products');
    setSelectedProduct(null);
  };

  const handleNavigateToProducts = () => {
    setCurrentView('products');
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Header setCurrentView={setCurrentView} />
            
            <main>
              {currentView === 'home' && (
                <>
                  <Hero onNavigateToProducts={handleNavigateToProducts} />
                  <FeaturedProducts 
                    onViewProduct={handleViewProduct}
                    onNavigateToProducts={handleNavigateToProducts}
                  />
                  <Categories />
                </>
              )}

              {currentView === 'products' && (
                <ProductCatalog onViewProduct={handleViewProduct} />
              )}

              {currentView === 'product-details' && selectedProduct && (
                <ProductDetails 
                  product={selectedProduct} 
                  onBack={handleBackToProducts}
                />
              )}

              {currentView === 'dashboard' && <Dashboard />}

              {currentView === 'admin' && <AdminPanel />}

              {currentView === 'search' && (
                <div className="max-w-7xl mx-auto px-4 py-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    Search Results
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Search functionality will be implemented here...
                  </p>
                </div>
              )}
            </main>

            <ToastContainer />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;