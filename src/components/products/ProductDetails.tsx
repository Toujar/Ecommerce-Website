import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Product, Review } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    product_id: '',
    user_id: '1',
    user_name: 'John Doe',
    rating: 5,
    comment: 'Excellent product! Highly recommend.',
    created_at: '2024-01-15'
  },
  {
    id: '2',
    product_id: '',
    user_id: '2',
    user_name: 'Jane Smith',
    rating: 4,
    comment: 'Good quality, fast delivery.',
    created_at: '2024-01-10'
  }
];

export function ProductDetails({ product, onBack }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const discountPercentage = product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-xl">
            <img
              src={product.images[selectedImage] || product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-blue-500'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              {product.brand}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              {product.rating} ({product.review_count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              ${(product.discount_price || product.price).toFixed(2)}
            </span>
            {product.discount_price && (
              <div className="flex items-center gap-2">
                <span className="text-xl text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-md text-sm font-semibold">
                  -{discountPercentage}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              product.stock_quantity > 10 ? 'bg-green-500' :
              product.stock_quantity > 0 ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.stock_quantity > 10 ? 'In Stock' :
               product.stock_quantity > 0 ? `Only ${product.stock_quantity} left!` :
               'Out of Stock'}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Description
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Quantity:
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock_quantity === 0}
              className="flex-1"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Specifications */}
          {Object.keys(product.specifications).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Specifications
              </h3>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400 capitalize">
                      {key.replace('_', ' ')}:
                    </span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Customer Reviews
            </h3>
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {review.user_name}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}