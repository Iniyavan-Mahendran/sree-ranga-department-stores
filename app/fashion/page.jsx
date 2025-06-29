/**
 * Fashion Page
 * This shows clothing and fashion items
 * Like the clothing section in a department store
 */

'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Shirt, Star, TrendingUp, Award } from 'lucide-react';
import { setProducts, setCategories, setSelectedCategory } from '@/store/slices/productsSlice';
import ProductCard from '@/components/Product/ProductCard';

// Import mock data
import productsData from '@/public/mocks/products.json';
import categoriesData from '@/public/mocks/categories.json';

const FashionPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(setProducts(productsData));
    dispatch(setCategories(categoriesData));
    dispatch(setSelectedCategory('dresses')); // Set to fashion category
  }, [dispatch]);
  
  // Filter for fashion products (dresses and shoes)
  const fashionProducts = products.filter(product => 
    product.category === 'dresses' || product.category === 'shoes'
  );
  
  const fashionCategories = [
    {
      title: "Men's Fashion",
      description: "Shirts, pants, and formal wear",
      icon: "👔",
      count: fashionProducts.filter(p => p.name.toLowerCase().includes('men')).length
    },
    {
      title: "Women's Fashion",
      description: "Dresses, tops, and ethnic wear",
      icon: "👗",
      count: fashionProducts.filter(p => p.name.toLowerCase().includes('women')).length
    },
    {
      title: "Kids' Fashion",
      description: "Comfortable and stylish kids wear",
      icon: "👶",
      count: fashionProducts.filter(p => p.name.toLowerCase().includes('kids')).length
    },
    {
      title: "Footwear",
      description: "Shoes for all occasions",
      icon: "👟",
      count: fashionProducts.filter(p => p.category === 'shoes').length
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Shirt className="h-8 w-8 text-purple-500" />
          <h1 className="text-4xl font-bold text-gray-900">Fashion</h1>
          <Star className="h-8 w-8 text-purple-500" />
        </div>
        <p className="text-xl text-gray-600">
          Discover the latest trends and timeless classics for every style
        </p>
      </div>
      
      {/* Fashion Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-white mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">✨ Fashion Forward</h2>
          <p className="text-xl mb-4">Express yourself with our curated collection</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div>
              <div className="text-4xl mb-2">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Latest Trends</h3>
              <p className="text-purple-100">Stay ahead of fashion</p>
            </div>
            <div>
              <div className="text-4xl mb-2">💎</div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-purple-100">Finest materials and craftsmanship</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🏷️</div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-purple-100">Affordable luxury for everyone</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fashion Categories */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fashionCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{category.description}</p>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {category.count} items
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Trending Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-6 text-white text-center">
          <TrendingUp className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Trending Now</h3>
          <p>Most popular fashion items</p>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-6 text-white text-center">
          <Award className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Best Sellers</h3>
          <p>Customer favorite picks</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white text-center">
          <Star className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">New Arrivals</h3>
          <p>Latest fashion collections</p>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Fashion Collection ({fashionProducts.length} items)
        </h2>
        
        {fashionProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {fashionProducts.map((product, index) => (
              <div key={product.id} className="relative">
                {index < 3 && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      TRENDING
                    </div>
                  </div>
                )}
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👗</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No fashion items available</h3>
            <p className="text-gray-600">Check back later for new collections!</p>
          </div>
        )}
      </div>
      
      {/* Fashion Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fashion Tips & Care</h2>
          <p className="text-gray-600 mb-6">
            Make your fashion purchases last longer with proper care and styling tips.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Size Guide</h3>
              <p className="text-gray-600 text-sm">Check our detailed size charts for perfect fit</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Care Instructions</h3>
              <p className="text-gray-600 text-sm">Follow care labels to maintain quality</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Style Tips</h3>
              <p className="text-gray-600 text-sm">Mix and match for versatile looks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionPage;