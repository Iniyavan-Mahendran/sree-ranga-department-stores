/**
 * Mobile Menu Component
 * This shows the mobile navigation menu
 */

'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { X, User, Heart, Package, Settings, LogOut } from 'lucide-react';
import { toggleMobileMenu } from '@/store/slices/uiSlice';
import { setSelectedCategory } from '@/store/slices/productsSlice';
import { logout } from '@/store/slices/authSlice';

const MobileMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const { mobileMenuOpen } = useSelector((state) => state.ui);
  const { categories } = useSelector((state) => state.products);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(toggleMobileMenu());
  };
  
  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    dispatch(toggleMobileMenu());
  };
  
  if (!mobileMenuOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="bg-white w-80 h-full shadow-lg overflow-y-auto">
        
        {/* Menu header */}
        <div className="flex items-center justify-between p-4 border-b bg-slate-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              {isAuthenticated ? (
                <div>
                  <p className="font-medium">Hello, {user?.name}</p>
                  <p className="text-sm text-gray-300">{user?.email}</p>
                </div>
              ) : (
                <div>
                  <p className="font-medium">Hello, Guest</p>
                  <p className="text-sm text-gray-300">Sign in for better experience</p>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="p-2 hover:bg-slate-800 rounded"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Menu content */}
        <div className="p-4">
          
          {/* User actions */}
          {isAuthenticated ? (
            <div className="space-y-2 mb-6 pb-6 border-b">
              <a
                href="/profile"
                onClick={() => dispatch(toggleMobileMenu())}
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
              >
                <User size={20} className="text-gray-600" />
                <span>Your Account</span>
              </a>
              <a
                href="/wishlist"
                onClick={() => dispatch(toggleMobileMenu())}
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
              >
                <Heart size={20} className="text-gray-600" />
                <span>Your Wishlist</span>
              </a>
              <a
                href="/profile"
                onClick={() => dispatch(toggleMobileMenu())}
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
              >
                <Package size={20} className="text-gray-600" />
                <span>Your Orders</span>
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full text-left p-3 hover:bg-gray-100 rounded-lg text-red-600"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2 mb-6 pb-6 border-b">
              <a
                href="/auth/login"
                onClick={() => dispatch(toggleMobileMenu())}
                className="block w-full bg-orange-400 hover:bg-orange-500 text-white text-center py-3 rounded-lg font-medium"
              >
                Sign In
              </a>
              <a
                href="/auth/register"
                onClick={() => dispatch(toggleMobileMenu())}
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 text-center py-3 rounded-lg font-medium"
              >
                Create Account
              </a>
            </div>
          )}
          
          {/* Categories */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 mb-3">Shop by Category</h3>
            
            {/* All categories option */}
            <button
              onClick={() => handleCategorySelect('all')}
              className="flex items-center space-x-3 w-full text-left p-3 hover:bg-gray-100 rounded-lg"
            >
              <span className="text-2xl">🏪</span>
              <span className="font-medium text-gray-900">All Categories</span>
            </button>
            
            {/* Individual categories */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="flex items-center space-x-3 w-full text-left p-3 hover:bg-gray-100 rounded-lg"
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

export default MobileMenu;