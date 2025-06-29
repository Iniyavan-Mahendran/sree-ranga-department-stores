/**
 * Product Card Component
 * This shows individual product information in a card format
 * Used in product listings and grids
 */

'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { addToCart } from '@/store/slices/cartSlice';
import { showNotification } from '@/store/slices/uiSlice';

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Handle add to cart
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click
    dispatch(addToCart(product));
    dispatch(showNotification({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} added to cart!`
    }));
  };
  
  // Handle wishlist toggle
  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    dispatch(showNotification({
      type: 'success',
      title: isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist',
      message: `${product.name} ${isWishlisted ? 'removed from' : 'added to'} wishlist`
    }));
  };
  
  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Handle card click - navigate to product detail
  const handleCardClick = () => {
    window.location.href = `/products/${product.id}`;
  };
  
  // Calculate discount percentage
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      
      {/* Product image */}
      <div className="relative overflow-hidden rounded-t-lg">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">No Image</span>
          </div>
        )}
        
        {/* Discount badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            -{discountPercentage}%
          </div>
        )}
        
        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Heart 
            size={16} 
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'} 
          />
        </button>
        
        {/* Stock status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">{t('common.out_of_stock')}</span>
          </div>
        )}
      </div>
      
      {/* Product details */}
      <div className="p-4">
        
        {/* Brand */}
        {product.brand && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.brand}</div>
        )}
        
        {/* Product name */}
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">({product.reviews})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            product.inStock
              ? 'bg-orange-400 hover:bg-orange-500 text-white'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <ShoppingCart size={16} />
            <span>{t('common.add_to_cart')}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;