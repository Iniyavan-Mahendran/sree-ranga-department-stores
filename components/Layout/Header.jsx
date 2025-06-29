/**
 * Header Component
 * This is the top bar of our website that shows on every page
 * It has the logo, search box, and shopping cart button
 * Think of it like the dashboard of a car - it has all the important controls
 */

'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Search, ShoppingCart, User, MapPin, Menu, Globe, Sun, Moon } from 'lucide-react';
import { toggleCart } from '@/store/slices/cartSlice';
import { toggleMobileMenu, setLanguage, setTheme } from '@/store/slices/uiSlice';
import { setSearchQuery } from '@/store/slices/productsSlice';

const Header = () => {
  const { t, i18n } = useTranslation(); // This helps us show text in different languages
  const dispatch = useDispatch(); // This helps us send actions to our store
  
  // Get data from our store (like checking what's in our backpack)
  const { totalItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { searchQuery } = useSelector((state) => state.products);
  const { theme } = useSelector((state) => state.ui);
  
  // Local state for this component (like temporary notes)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);
  
  // Set up theme when the page loads (like turning on the lights)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    dispatch(setTheme(savedTheme));
  }, [dispatch]);
  
  // When user types in search box
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  
  // When user presses Enter or clicks search button
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(setSearchQuery(searchInput.trim()));
      // Go to search results page
      window.location.href = `/search?q=${encodeURIComponent(searchInput.trim())}`;
    }
  };
  
  // When user changes language
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    dispatch(setLanguage(language));
    setShowLanguageMenu(false);
  };

  // When user clicks theme toggle (light/dark mode)
  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };
  
  // Available languages (like a menu of ice cream flavors)
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  ];

  return (
    <header className="bg-slate-900 dark:bg-slate-950 text-white sticky top-0 z-50">
      {/* Main header bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Mobile menu button (only shows on phones) */}
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="md:hidden p-2 hover:bg-slate-800 rounded"
            aria-label="Open mobile menu"
          >
            <Menu size={24} />
          </button>
          
          {/* Logo and store name */}
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center space-x-3">
              {/* Logo - like a store sign */}
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SR</span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-green-400">
                  Sree Ranga
                </h1>
                <p className="text-xs text-gray-300 hidden md:block">Department Stores</p>
              </div>
            </a>
            
            {/* Location info (only shows on computers) */}
            <div className="hidden md:block text-sm">
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>{t('header.deliver_to')}</span>
              </div>
              <div className="text-green-400 font-semibold">
                Dharmapuri - 636701
              </div>
            </div>
          </div>
          
          {/* Search bar (like a magic box to find things) */}
          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              {/* Category dropdown */}
              <select className="absolute left-0 top-0 h-full w-20 bg-gray-200 text-black border-r border-gray-300 rounded-l-md text-sm">
                <option>{t('header.all_categories')}</option>
              </select>
              
              {/* Search input box */}
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder={t('common.search')}
                className="w-full pl-20 pr-12 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              
              {/* Search button */}
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-green-500 hover:bg-green-600 rounded-r-md transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            
            {/* Theme toggle button (light/dark mode) */}
            <button
              onClick={handleThemeToggle}
              className="p-2 hover:bg-slate-800 rounded"
              title="Toggle theme"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-1 hover:bg-slate-800 p-2 rounded"
                aria-label="Change language"
              >
                <Globe size={20} />
                <span className="hidden md:block">{i18n.language.toUpperCase()}</span>
              </button>
              
              {/* Language dropdown menu */}
              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white text-black rounded-md shadow-lg border z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* User menu (shows different things if logged in or not) */}
            <div className="hidden md:block">
              <div className="text-sm">
                {isAuthenticated ? (
                  <a href="/profile" className="hover:text-green-400">
                    <div>Hello, {user?.name}</div>
                    <div className="font-semibold">{t('header.account_lists')}</div>
                  </a>
                ) : (
                  <a href="/auth/login" className="hover:text-green-400">
                    <div>{t('header.hello_signin')}</div>
                    <div className="font-semibold">{t('header.account_lists')}</div>
                  </a>
                )}
              </div>
            </div>
            
            {/* User icon for phones */}
            <a 
              href={isAuthenticated ? "/profile" : "/auth/login"} 
              className="md:hidden p-2 hover:bg-slate-800 rounded"
              aria-label="User account"
            >
              <User size={24} />
            </a>
            
            {/* Returns & Orders (only on computers) */}
            <a href="/profile" className="hidden md:block text-sm hover:text-green-400">
              <div>Returns</div>
              <div className="font-semibold">& Orders</div>
            </a>
            
            {/* Shopping cart button */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 hover:bg-slate-800 rounded flex items-center space-x-1"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {/* Show number of items in cart (like a badge) */}
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="hidden md:block">{t('common.cart')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;