/**
 * Fresh Products Page
 * This shows fresh groceries and perishable items
 * Like the fresh produce section in a grocery store
 */

'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Leaf, Clock, Truck, Shield } from 'lucide-react';
import { setProducts, setCategories, setSelectedCategory } from '@/store/slices/productsSlice';
import ProductCard from '@/components/Product/ProductCard';

// Import mock data
import productsData from '@/public/mocks/products.json';
import categoriesData from '@/public/mocks/categories.json';

const FreshPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(setProducts(productsData));
    dispatch(setCategories(categoriesData));
    dispatch(setSelectedCategory('groceries')); // Set to groceries category
  }, [dispatch]);
  
  // Filter for fresh products (groceries and bakery items)
  const freshProducts = products.filter(product => 
    product.category === 'groceries' || product.category === 'bakery'
  );
  
  const freshFeatures = [
    {
      title: "Farm Fresh",
      description: "Directly sourced from local farms",
      icon: Leaf,
      color: "text-green-600 bg-green-100"
    },
    {
      title: "Daily Delivery",
      description: "Fresh products delivered every day",
      icon: Truck,
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: "Quality Assured",
      description: "Handpicked for freshness and quality",
      icon: Shield,
      color: "text-purple-600 bg-purple-100"
    },
    {
      title: "Same Day Delivery",
      description: "Order before 2 PM for same day delivery",
      icon: Clock,
      color: "text-orange-600 bg-orange-100"
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Leaf className="h-8 w-8 text-green-500" />
          <h1 className="text-4xl font-bold text-gray-900">Fresh Products</h1>
          <Leaf className="h-8 w-8 text-green-500" />
        </div>
        <p className="text-xl text-gray-600">
          Farm-fresh groceries and daily essentials delivered to your doorstep
        </p>
      </div>
      
      {/* Fresh Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">🥬 Fresh from Farm to Table</h2>
          <p className="text-xl mb-4">Get the freshest produce delivered daily</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div>
              <div className="text-4xl mb-2">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Same Day Delivery</h3>
              <p className="text-green-100">Order before 2 PM</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🌱</div>
              <h3 className="text-xl font-semibold mb-2">Organic Options</h3>
              <p className="text-green-100">Pesticide-free produce</p>
            </div>
            <div>
              <div className="text-4xl mb-2">❄️</div>
              <h3 className="text-xl font-semibold mb-2">Cold Chain</h3>
              <p className="text-green-100">Temperature controlled</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Fresh Products?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {freshFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${feature.color}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Fresh Products ({freshProducts.length} items)
        </h2>
        
        {freshProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {freshProducts.map((product, index) => (
              <div key={product.id} className="relative">
                {index < 3 && (
                  <div className="absolute -top-2 -left-2 z-10">
                    <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      FRESH
                    </div>
                  </div>
                )}
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🥬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No fresh products available</h3>
            <p className="text-gray-600">Check back later for fresh arrivals!</p>
          </div>
        )}
      </div>
      
      {/* Freshness Guarantee */}
      <div className="bg-green-50 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Our Freshness Guarantee</h2>
          <p className="text-green-700 mb-6">
            We guarantee the freshness of all our products. If you're not satisfied with the quality, 
            we'll replace it or give you a full refund.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-green-800 mb-2">Quality Check</h3>
              <p className="text-green-600 text-sm">Every product is inspected before delivery</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-green-800 mb-2">Money Back</h3>
              <p className="text-green-600 text-sm">100% refund if not satisfied</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-green-800 mb-2">Free Replacement</h3>
              <p className="text-green-600 text-sm">We'll replace any damaged items for free</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreshPage;