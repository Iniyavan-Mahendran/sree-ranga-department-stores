/**
 * Bestsellers Page
 * This shows the most popular and best-selling products
 */

'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Star, Award } from 'lucide-react';
import { setProducts, setCategories } from '@/store/slices/productsSlice';
import ProductCard from '@/components/Product/ProductCard';

// Import mock data
import productsData from '@/public/mocks/products.json';
import categoriesData from '@/public/mocks/categories.json';

const BestsellersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(setProducts(productsData));
    dispatch(setCategories(categoriesData));
  }, [dispatch]);
  
  // Sort products by rating and reviews (bestsellers)
  const bestsellers = products
    .filter(product => product.rating >= 4.0 && product.reviews >= 100)
    .sort((a, b) => {
      // Sort by rating first, then by number of reviews
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.reviews - a.reviews;
    });
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <TrendingUp className="h-8 w-8 text-orange-500" />
          <h1 className="text-4xl font-bold text-gray-900">Bestsellers</h1>
          <Award className="h-8 w-8 text-orange-500" />
        </div>
        <p className="text-xl text-gray-600">
          Most popular products loved by our customers
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white text-center">
          <Star className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">4.0+ Rating</h3>
          <p>Highly rated products</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white text-center">
          <TrendingUp className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Top Selling</h3>
          <p>Most purchased items</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white text-center">
          <Award className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Customer Choice</h3>
          <p>Recommended by buyers</p>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Top Rated Products ({bestsellers.length} items)
        </h2>
        
        {bestsellers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {bestsellers.map((product, index) => (
              <div key={product.id} className="relative">
                {index < 3 && (
                  <div className="absolute -top-2 -left-2 z-10">
                    <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      #{index + 1}
                    </div>
                  </div>
                )}
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bestsellers found</h3>
            <p className="text-gray-600">Check back later for popular products!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestsellersPage;