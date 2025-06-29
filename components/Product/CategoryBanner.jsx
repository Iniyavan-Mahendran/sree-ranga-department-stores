/**
 * Category Banner Component
 * This shows a banner with category highlights and deals
 */

'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { setSelectedCategory } from '@/store/slices/productsSlice';

const CategoryBanner = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);
  
  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
  };
  
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        
        {/* Main banner */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Starting ₹199</h2>
              <p className="text-xl mb-4">Budget store</p>
              <div className="flex space-x-4 text-sm">
                <div>
                  <div className="font-semibold">FREE</div>
                  <div>DELIVERY</div>
                </div>
                <div>
                  <div className="font-semibold">EASY</div>
                  <div>RETURNS</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-48 h-48 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <div className="text-6xl">🛍️</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Category highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          
          {/* Deal cards */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🏠</div>
              <div className="font-semibold text-sm">Appliances for your home</div>
              <div className="text-xs text-gray-600">Up to 55% off</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🆕</div>
              <div className="font-semibold text-sm">400+ New Launches</div>
              <div className="text-xs text-gray-600">Prime Day | 12 - 14 July</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-semibold text-sm">Revamp your home</div>
              <div className="text-xs text-gray-600">in style</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-semibold text-sm">Under ₹499</div>
              <div className="text-xs text-gray-600">Deals on home essentials</div>
            </div>
          </div>
        </div>
        
        {/* Categories scroll */}
        <div className="relative">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Shop by Category</h3>
          
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="flex-shrink-0 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow w-32 text-center"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-medium text-sm text-gray-900">
                  {t(`categories.${category.id}`)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;