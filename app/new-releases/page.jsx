/**
 * New Releases Page
 * This shows the latest products added to the store
 */

'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Sparkles, Calendar, Package } from 'lucide-react';
import { setProducts, setCategories } from '@/store/slices/productsSlice';
import ProductCard from '@/components/Product/ProductCard';

// Import mock data
import productsData from '@/public/mocks/products.json';
import categoriesData from '@/public/mocks/categories.json';

const NewReleasesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(setProducts(productsData));
    dispatch(setCategories(categoriesData));
  }, [dispatch]);
  
  // Get latest products (simulate by taking products with higher IDs)
  const newReleases = products
    .filter(product => product.id > 15) // Simulate new products
    .sort((a, b) => b.id - a.id); // Sort by newest first
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="h-8 w-8 text-purple-500" />
          <h1 className="text-4xl font-bold text-gray-900">New Releases</h1>
          <Package className="h-8 w-8 text-purple-500" />
        </div>
        <p className="text-xl text-gray-600">
          Discover the latest products just added to our collection
        </p>
      </div>
      
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Fresh Arrivals</h3>
          <p>Latest products in stock</p>
        </div>
        
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-6 text-white text-center">
          <Calendar className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">This Week</h3>
          <p>Added in the last 7 days</p>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-6 text-white text-center">
          <Package className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Limited Stock</h3>
          <p>Get them while they last</p>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Latest Arrivals ({newReleases.length} products)
        </h2>
        
        {newReleases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {newReleases.map((product, index) => (
              <div key={product.id} className="relative">
                {index < 5 && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      NEW
                    </div>
                  </div>
                )}
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No new releases</h3>
            <p className="text-gray-600">Check back soon for new products!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewReleasesPage;