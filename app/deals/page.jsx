/**
 * Today's Deals Page
 * This shows special offers and discounted products
 */

'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Clock, Zap, Percent } from 'lucide-react';
import { setProducts, setCategories } from '@/store/slices/productsSlice';
import ProductCard from '@/components/Product/ProductCard';

// Import mock data
import productsData from '@/public/mocks/products.json';
import categoriesData from '@/public/mocks/categories.json';

const DealsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(setProducts(productsData));
    dispatch(setCategories(categoriesData));
  }, [dispatch]);
  
  // Filter products with discounts
  const dealsProducts = products.filter(product => product.discount && product.discount > 0);
  
  // Sort by discount percentage (highest first)
  const sortedDeals = dealsProducts.sort((a, b) => b.discount - a.discount);
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Zap className="h-8 w-8 text-yellow-500" />
          <h1 className="text-4xl font-bold text-gray-900">Today's Deals</h1>
          <Zap className="h-8 w-8 text-yellow-500" />
        </div>
        <p className="text-xl text-gray-600">
          Limited time offers on your favorite products. Save big today!
        </p>
      </div>
      
      {/* Deal Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white text-center">
          <Percent className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Up to 30% Off</h3>
          <p>Electronics & Gadgets</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white text-center">
          <Clock className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Flash Sale</h3>
          <p>Limited Time Offers</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white text-center">
          <Zap className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Daily Deals</h3>
          <p>New deals every day</p>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Special Offers ({sortedDeals.length} products)
        </h2>
        
        {sortedDeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sortedDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No deals available</h3>
            <p className="text-gray-600">Check back later for amazing offers!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealsPage;