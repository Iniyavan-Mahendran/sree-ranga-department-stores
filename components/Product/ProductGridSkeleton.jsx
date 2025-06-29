/**
 * Product Grid Skeleton Component
 * Loading placeholder for product grid
 */

'use client';

import ProductSkeleton from './ProductSkeleton';

const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {[...Array(count)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;