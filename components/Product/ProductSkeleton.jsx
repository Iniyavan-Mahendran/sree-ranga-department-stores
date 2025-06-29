/**
 * Product Skeleton Component
 * Loading placeholder for product cards
 */

'use client';

const ProductSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
      
      {/* Content skeleton */}
      <div className="p-4">
        {/* Brand */}
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-1/3"></div>
        
        {/* Product name */}
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-3 w-3/4"></div>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
        </div>
        
        {/* Button */}
        <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;