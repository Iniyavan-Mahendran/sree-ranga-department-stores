/**
 * Product Grid Component
 * This displays products in a responsive grid layout
 * Shows filtered products based on search and category
 */

'use client';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const { t } = useTranslation();
  const { filteredProducts, loading, selectedCategory } = useSelector((state) => state.products);
  
  // Show loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Show no products message
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🛍️</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-600 mb-4">
          Try adjusting your search or filter criteria
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-md transition-colors"
        >
          Reset Filters
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      
      {/* Results header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedCategory === 'all' 
            ? 'All Products' 
            : t(`categories.${selectedCategory}`)
          }
        </h2>
        <div className="text-sm text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
        </div>
      </div>
      
      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;