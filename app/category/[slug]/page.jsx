/**
 * Category Page
 * This shows products from a specific category
 */

'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setSelectedCategory } from '@/store/slices/productsSlice';
import ProductGrid from '@/components/Product/ProductGrid';
import ProductFilters from '@/components/Filters/ProductFilters';

const CategoryPage = ({ params }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector((state) => state.products);
  
  const category = categories.find(cat => cat.id === params.slug);
  
  useEffect(() => {
    if (params.slug && params.slug !== selectedCategory) {
      dispatch(setSelectedCategory(params.slug));
    }
  }, [params.slug, selectedCategory, dispatch]);
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t(`categories.${category.id}`)}
            </h1>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </div>
      </div>
      
      <ProductFilters />
      <ProductGrid />
    </div>
  );
};

export default CategoryPage;