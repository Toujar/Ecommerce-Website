import React from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart();

  const discountPercentage = product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            -{discountPercentage}%
          </div>
        )}

        {/* Stock Badge */}
        {product.stock_quantity < 10 && product.stock_quantity > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            Only {product.stock_quantity} left!
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails(product)}
              className="bg-white text-gray-900 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button className="bg-white text-gray-900 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {product.brand}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            ({product.review_count})
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              ${(product.discount_price || product.price).toFixed(2)}
            </span>
            {product.discount_price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}