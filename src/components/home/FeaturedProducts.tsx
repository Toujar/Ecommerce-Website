import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';
import { Button } from '../ui/Button';

interface FeaturedProductsProps {
  onViewProduct: (product: Product) => void;
  onNavigateToProducts: () => void;
}

// Mock featured products
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    discount_price: 149.99,
    image_url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800'],
    category: 'Electronics',
    brand: 'TechSound',
    stock_quantity: 15,
    rating: 4.5,
    review_count: 128,
    specifications: {},
    created_at: '2024-01-01'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.',
    price: 299.99,
    discount_price: 249.99,
    image_url: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800'],
    category: 'Electronics',
    brand: 'FitTech',
    stock_quantity: 8,
    rating: 4.2,
    review_count: 89,
    specifications: {},
    created_at: '2024-01-02'
  },
  {
    id: '3',
    name: 'Gaming Mechanical Keyboard',
    description: 'Professional gaming keyboard with RGB backlighting and mechanical switches.',
    price: 159.99,
    discount_price: 119.99,
    image_url: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=800'],
    category: 'Gaming',
    brand: 'GameTech',
    stock_quantity: 3,
    rating: 4.6,
    review_count: 245,
    specifications: {},
    created_at: '2024-01-05'
  },
  {
    id: '4',
    name: 'Wireless Phone Charger',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 39.99,
    discount_price: 29.99,
    image_url: 'https://images.pexels.com/photos/4474041/pexels-photo-4474041.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/4474041/pexels-photo-4474041.jpeg?auto=compress&cs=tinysrgb&w=800'],
    category: 'Accessories',
    brand: 'ChargeFast',
    stock_quantity: 50,
    rating: 4.3,
    review_count: 203,
    specifications: {},
    created_at: '2024-01-04'
  }
];

export function FeaturedProducts({ onViewProduct, onNavigateToProducts }: FeaturedProductsProps) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium products at amazing prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={onNavigateToProducts}
            variant="outline"
            size="lg"
          >
            View All Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}