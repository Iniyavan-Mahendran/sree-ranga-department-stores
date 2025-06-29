/**
 * Product Detail Page
 * This shows detailed information about a single product
 * Users can view images, read description, and add to cart
 */

'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { addToCart } from '@/store/slices/cartSlice';
import { showNotification } from '@/store/slices/uiSlice';

const ProductDetailPage = ({ params }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Find product by ID
  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(params.id));
    setProduct(foundProduct);
  }, [params.id, products]);
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
      dispatch(showNotification({
        type: 'success',
        title: 'Added to Cart',
        message: `${product.name} (${quantity}) added to cart!`
      }));
    }
  };
  
  // Handle quantity change
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Product Information */}
        <div className="space-y-6">
          
          {/* Brand and Name */}
          <div>
            {product.brand && (
              <p className="text-sm text-blue-600 font-medium mb-1">
                Visit the {product.brand} Store
              </p>
            )}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-sm text-blue-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {discountPercentage > 0 && (
                <span className="bg-red-500 text-white px-2 py-1 text-sm font-semibold rounded">
                  -{discountPercentage}%
                </span>
              )}
              <span className="text-3xl font-bold text-red-600">
                ₹{product.price.toLocaleString()}
              </span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">M.R.P.:</span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              </div>
            )}
            <p className="text-sm text-gray-600">Inclusive of all taxes</p>
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">About this item</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          {/* Quantity and Add to Cart */}
          {product.inStock && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-100"
                    disabled={quantity >= 10}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
                <button className="flex-1 bg-orange-400 hover:bg-orange-500 text-white font-medium py-3 px-6 rounded-md transition-colors">
                  Buy Now
                </button>
              </div>
              
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <Heart size={16} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                <span>Add to Wish List</span>
              </button>
            </div>
          )}
          
          {/* Features */}
          <div className="border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Truck size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-600">On orders above ₹499</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Secure Payment</p>
                  <p className="text-xs text-gray-600">100% secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;