/**
 * Search Results Page
 * This shows products based on search query
 */

'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { setSearchQuery } from '@/store/slices/productsSlice';
import ProductGrid from '@/components/Product/ProductGrid';
import ProductFilters from '@/components/Filters/ProductFilters';

const SearchPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { filteredProducts, searchQuery } = useSelector((state) => state.products);
  
  useEffect(() => {
    if (query && query !== searchQuery) {
      dispatch(setSearchQuery(query));
    }
  }, [query, searchQuery, dispatch]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600">
          {filteredProducts.length} results found
        </p>
      </div>
      
      <ProductFilters />
      <ProductGrid />
    </div>
  );
};

export default SearchPage;