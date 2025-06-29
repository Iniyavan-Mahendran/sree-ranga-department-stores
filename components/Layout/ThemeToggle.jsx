/**
 * Theme Toggle Component
 * Standalone theme toggle button
 */

'use client';

import { useSelector, useDispatch } from 'react-redux';
import { Sun, Moon } from 'lucide-react';
import { setTheme } from '@/store/slices/uiSlice';

const ThemeToggle = ({ className = '' }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);
  
  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };
  
  return (
    <button
      onClick={handleThemeToggle}
      className={`p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-600" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggle;