import React, { useState, useEffect } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Button } from '../ui/Button';

interface ProductCatalogProps {
  onViewProduct: (product: Product) => void;
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    discount_price: 149.99,
    image_url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    brand: 'TechSound',
    stock_quantity: 15,
    rating: 4.5,
    review_count: 128,
    specifications: {
      'battery_life': '30 hours',
      'connectivity': 'Bluetooth 5.0',
      'weight': '250g'
    },
    created_at: '2024-01-01'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.',
    price: 299.99,
    discount_price: 249.99,
    image_url: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    brand: 'FitTech',
    stock_quantity: 8,
    rating: 4.2,
    review_count: 89,
    specifications: {
      'display': '1.4 inch AMOLED',
      'battery_life': '7 days',
      'water_resistance': '5ATM'
    },
    created_at: '2024-01-02'
  },
  {
    id: '3',
    name: 'Portable Laptop Stand',
    description: 'Ergonomic and adjustable laptop stand made from premium aluminum.',
    price: 79.99,
    image_url: 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Accessories',
    brand: 'DeskPro',
    stock_quantity: 25,
    rating: 4.7,
    review_count: 156,
    specifications: {
      'material': 'Aluminum',
      'weight': '1.2kg',
      'compatibility': 'Up to 17 inch laptops'
    },
    created_at: '2024-01-03'
  },
  {
    id: '4',
    name: 'Wireless Phone Charger',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 39.99,
    discount_price: 29.99,
    image_url: 'https://images.pexels.com/photos/4474041/pexels-photo-4474041.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4474041/pexels-photo-4474041.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Accessories',
    brand: 'ChargeFast',
    stock_quantity: 50,
    rating: 4.3,
    review_count: 203,
    specifications: {
      'power_output': '15W',
      'compatibility': 'Qi-enabled devices',
      'cable_length': '1.2m'
    },
    created_at: '2024-01-04'
  },
  {
    id: '5',
    name: 'Gaming Mechanical Keyboard',
    description: 'Professional gaming keyboard with RGB backlighting and mechanical switches.',
    price: 159.99,
    discount_price: 119.99,
    image_url: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Gaming',
    brand: 'GameTech',
    stock_quantity: 3,
    rating: 4.6,
    review_count: 245,
    specifications: {
      'switch_type': 'Mechanical Blue',
      'backlighting': 'RGB',
      'connectivity': 'USB-C'
    },
    created_at: '2024-01-05'
  },
  {
    id: '6',
    name: 'HD Webcam',
    description: '1080p HD webcam with auto-focus and built-in microphone for video calls.',
    price: 89.99,
    image_url: 'https://images.pexels.com/photos/4474064/pexels-photo-4474064.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4474064/pexels-photo-4474064.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    brand: 'VideoMax',
    stock_quantity: 20,
    rating: 4.1,
    review_count: 67,
    specifications: {
      'resolution': '1080p HD',
      'frame_rate': '30fps',
      'microphone': 'Built-in stereo'
    },
    created_at: '2024-01-06'
  }
];

export function ProductCatalog({ onViewProduct }: ProductCatalogProps) {
  const [products] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    priceRange: [0, 1000],
    minRating: 0
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = [...products];

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }

    filtered = filtered.filter(p => {
      const price = p.discount_price || p.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    if (filters.minRating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.minRating);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return (a.discount_price || a.price) - (b.discount_price || b.price);
        case 'price_high':
          return (b.discount_price || b.price) - (a.discount_price || a.price);
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, filters, sortBy]);

  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="name">Name A-Z</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-80 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Filters
              </h3>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Brand
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [parseInt(e.target.value), prev.priceRange[1]]
                    }))}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                    }))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="0">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => setFilters({
                  category: '',
                  brand: '',
                  priceRange: [0, 1000],
                  minRating: 0
                })}
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        <div className="flex-1">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewProduct}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex gap-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        ${(product.discount_price || product.price).toFixed(2)}
                      </span>
                      <Button size="sm" onClick={() => onViewProduct(product)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No products found matching your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}