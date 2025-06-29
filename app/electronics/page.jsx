/**
 * Electronics Page
 * This shows electronic devices and gadgets
 * Like the electronics section in a department store
 */

'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Smartphone, Laptop, Headphones, Camera, Zap, Shield } from 'lucide-react';
import { setProducts, setCategories, setSelectedCategory } from '@/store/slices/productsSlice';
import ProductCard from '@/components/Product/ProductCard';

// Import mock data
import productsData from '@/public/mocks/products.json';
import categoriesData from '@/public/mocks/categories.json';

const ElectronicsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(setProducts(productsData));
    dispatch(setCategories(categoriesData));
    dispatch(setSelectedCategory('electronics')); // Set to electronics category
  }, [dispatch]);
  
  // Filter for electronics products
  const electronicsProducts = products.filter(product => 
    product.category === 'electronics'
  );
  
  const electronicsCategories = [
    {
      title: "Smartphones",
      description: "Latest mobile phones and accessories",
      icon: Smartphone,
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: "Laptops",
      description: "Computers for work and gaming",
      icon: Laptop,
      color: "text-green-600 bg-green-100"
    },
    {
      title: "Audio",
      description: "Headphones, speakers, and sound systems",
      icon: Headphones,
      color: "text-purple-600 bg-purple-100"
    },
    {
      title: "Cameras",
      description: "Digital cameras and photography gear",
      icon: Camera,
      color: "text-orange-600 bg-orange-100"
    }
  ];
  
  const features = [
    {
      title: "Latest Technology",
      description: "Cutting-edge devices and innovations",
      icon: Zap,
      color: "text-yellow-600 bg-yellow-100"
    },
    {
      title: "Warranty Protection",
      description: "Comprehensive warranty on all products",
      icon: Shield,
      color: "text-green-600 bg-green-100"
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Zap className="h-8 w-8 text-blue-500" />
          <h1 className="text-4xl font-bold text-gray-900">Electronics</h1>
          <Smartphone className="h-8 w-8 text-blue-500" />
        </div>
        <p className="text-xl text-gray-600">
          Discover the latest technology and electronic devices
        </p>
      </div>
      
      {/* Electronics Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">⚡ Power Up Your Life</h2>
          <p className="text-xl mb-4">Latest gadgets and technology at unbeatable prices</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div>
              <div className="text-4xl mb-2">📱</div>
              <h3 className="text-xl font-semibold mb-2">Latest Models</h3>
              <p className="text-blue-100">Newest releases from top brands</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Warranty</h3>
              <p className="text-blue-100">Extended warranty options</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
              <p className="text-blue-100">On orders above ₹5,000</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Electronics Categories */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {electronicsCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${category.color}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${feature.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Products Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Electronics Collection ({electronicsProducts.length} items)
        </h2>
        
        {electronicsProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {electronicsProducts.map((product, index) => (
              <div key={product.id} className="relative">
                {index < 2 && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      TECH
                    </div>
                  </div>
                )}
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No electronics available</h3>
            <p className="text-gray-600">Check back later for new tech arrivals!</p>
          </div>
        )}
      </div>
      
      {/* Tech Support */}
      <div className="bg-blue-50 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Tech Support & Services</h2>
          <p className="text-blue-800 mb-6">
            Get expert help with your electronic purchases and enjoy our comprehensive support services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-blue-900 mb-2">Installation Service</h3>
              <p className="text-blue-700 text-sm">Professional setup and installation</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-blue-900 mb-2">Technical Support</h3>
              <p className="text-blue-700 text-sm">24/7 customer support hotline</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-blue-900 mb-2">Extended Warranty</h3>
              <p className="text-blue-700 text-sm">Additional protection plans available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectronicsPage;