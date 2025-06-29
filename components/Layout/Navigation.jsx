/**
 * Navigation Component
 * This is like a menu bar that shows different sections of our store
 * Think of it like the aisles in a grocery store - each button takes you to a different section
 */

'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { toggleMobileMenu, toggleSidebar } from '@/store/slices/uiSlice';
import { setSelectedCategory } from '@/store/slices/productsSlice';

const Navigation = () => {
  const { t } = useTranslation(); // Helps us show text in different languages
  const dispatch = useDispatch(); // Helps us send actions to our store
  
  const { mobileMenuOpen } = useSelector((state) => state.ui);
  const { categories } = useSelector((state) => state.products);
  
  // Main navigation items (like different sections of our store)
  const navItems = [
    { key: 'all', label: t('navigation.all'), href: '/' },
    { key: 'fresh', label: t('navigation.fresh'), href: '/fresh' },
    { key: 'bestsellers', label: t('navigation.bestsellers'), href: '/bestsellers' },
    { key: 'todays_deals', label: t('navigation.todays_deals'), href: '/deals' },
    { key: 'customer_service', label: t('navigation.customer_service'), href: '/help' },
    { key: 'new_releases', label: t('navigation.new_releases'), href: '/new-releases' },
    { key: 'fashion', label: t('navigation.fashion'), href: '/fashion' },
    { key: 'electronics', label: t('navigation.electronics'), href: '/electronics' },
    { key: 'home_kitchen', label: t('navigation.home_kitchen'), href: '/category/kitchenware' },
    { key: 'computers', label: t('navigation.computers'), href: '/category/electronics' },
    { key: 'books', label: t('navigation.books'), href: '/category/stationery' },
  ];
  
  // When user clicks on a category
  const handleCategorySelect = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(toggleMobileMenu()); // Close mobile menu if open
  };

  // When user clicks on a navigation item
  const handleNavClick = (item) => {
    if (item.key === 'all') {
      dispatch(setSelectedCategory('all'));
    } else if (item.href.includes('/category/')) {
      const categoryId = item.href.split('/category/')[1];
      dispatch(setSelectedCategory(categoryId));
    }
    window.location.href = item.href;
  };

  return (
    <>
      {/* Desktop Navigation (only shows on computers and tablets) */}
      <nav className="hidden md:block bg-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 h-12">
            
            {/* All Categories button */}
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="flex items-center space-x-2 hover:bg-slate-700 px-3 py-2 rounded"
              aria-label="All categories"
            >
              <Menu size={18} />
              <span className="font-medium">{t('navigation.all')}</span>
            </button>
            
            {/* Navigation links */}
            {navItems.slice(1).map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item)}
                className="hover:bg-slate-700 px-3 py-2 rounded text-sm font-medium whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation Overlay (only shows on phones when menu is open) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-white w-80 h-full shadow-lg">
            
            {/* Mobile menu header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-slate-900">{t('navigation.all')}</h2>
              <button
                onClick={() => dispatch(toggleMobileMenu())}
                className="p-2 hover:bg-gray-100 rounded"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Mobile menu content */}
            <div className="p-4">
              
              {/* Main navigation */}
              <div className="space-y-2 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Shop by Category</h3>
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      handleNavClick(item);
                      dispatch(toggleMobileMenu());
                    }}
                    className="block w-full text-left p-3 hover:bg-gray-100 rounded text-gray-700"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              
              {/* Categories */}
              {categories.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 mb-2">Categories</h3>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        handleCategorySelect(category.id);
                        window.location.href = `/category/${category.id}`;
                      }}
                      className="flex items-center space-x-3 w-full text-left p-3 hover:bg-gray-100 rounded"
                    >
                      <span className="text-2xl">{category.icon}</span>
                      <span className="text-gray-700">{t(`categories.${category.id}`)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;