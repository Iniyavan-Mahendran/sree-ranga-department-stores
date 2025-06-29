/**
 * Product Filters Component
 * This shows filters for sorting and filtering products
 */

'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Filter, SortAsc } from 'lucide-react';
import { setSortBy, setPriceRange } from '@/store/slices/productsSlice';

const ProductFilters = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const { sortBy, priceRange } = useSelector((state) => state.products);
  
  // Sort options
  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];
  
  // Handle sort change
  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };
  
  // Handle price range change
  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    dispatch(setPriceRange([0, value]));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        
        {/* Sort by */}
        <div className="flex items-center space-x-2">
          <SortAsc size={20} className="text-gray-600" />
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Price filter */}
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-600" />
          <label className="text-sm font-medium text-gray-700">Max Price:</label>
          <input
            type="range"
            min="0"
            max="20000"
            step="100"
            value={priceRange[1]}
            onChange={handlePriceRangeChange}
            className="slider"
          />
          <span className="text-sm font-medium text-gray-900 min-w-20">
            ₹{priceRange[1]}
          </span>
        </div>
        
        {/* Results count */}
        <div className="text-sm text-gray-600">
          Showing products under ₹{priceRange[1]}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;