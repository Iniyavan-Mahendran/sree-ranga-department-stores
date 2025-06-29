/**
 * Sidebar Component
 * This shows the categories sidebar when "All" is clicked
 * Contains all product categories with icons
 */

'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { setSelectedCategory } from '@/store/slices/productsSlice';

const Sidebar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { categories } = useSelector((state) => state.products);
  
  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(toggleSidebar()); // Close sidebar after selection
  };
  
  if (!sidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="bg-white w-80 h-full shadow-lg overflow-y-auto">
        
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b bg-slate-900 text-white">
          <h2 className="text-xl font-bold">{t('navigation.all')}</h2>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 hover:bg-slate-800 rounded"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Categories list */}
        <div className="p-4">
          <div className="space-y-2">
            
            {/* All categories option */}
            <button
              onClick={() => handleCategorySelect('all')}
              className="flex items-center space-x-3 w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="text-2xl">🏪</span>
              <span className="font-medium text-gray-900">All Categories</span>
            </button>
            
            {/* Individual categories */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="flex items-center space-x-3 w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">
                    {t(`categories.${category.id}`)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {category.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;