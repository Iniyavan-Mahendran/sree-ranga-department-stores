/**
 * Home Page Component
 * This is the main landing page of our e-commerce site
 * Shows featured products, categories, and promotional banners
 */

'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setProducts, setCategories } from '@/store/slices/productsSlice';
import CategoryBanner from '@/components/Product/CategoryBanner';
import ProductGrid from '@/components/Product/ProductGrid';
import ProductFilters from '@/components/Filters/ProductFilters';

// Import mock data
import productsData from '@/public/mocks/products.json';
import categoriesData from '@/public/mocks/categories.json';

const HomePage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  // Load mock data when component mounts
  useEffect(() => {
    dispatch(setProducts(productsData));
    dispatch(setCategories(categoriesData));
  }, [dispatch]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Category banner section */}
      <CategoryBanner />
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        
        {/* Filters */}
        <ProductFilters />
        
        {/* Product grid */}
        <ProductGrid />
      </div>
    </div>
  );
};

export default HomePage;