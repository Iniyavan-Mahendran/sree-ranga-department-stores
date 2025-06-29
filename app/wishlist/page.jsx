/**
 * Wishlist Page
 * This shows user's saved/favorite products
 */

'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { addToCart } from '@/store/slices/cartSlice';
import { showNotification } from '@/store/slices/uiSlice';

const WishlistPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  // Mock wishlist data (in real app, this would come from Redux store)
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Basmati Rice - 5kg",
      price: 450,
      originalPrice: 500,
      image: "https://images.pexels.com/photos/33783/rice-Vietnamese-food-grain.jpg?auto=compress&cs=tinysrgb&w=500",
      inStock: true,
      brand: "India Gate"
    },
    {
      id: 6,
      name: "Men's Running Shoes",
      price: 1200,
      originalPrice: 1500,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500",
      inStock: true,
      brand: "Nike"
    }
  ]);
  
  // Handle add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(showNotification({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} added to cart!`
    }));
  };
  
  // Handle remove from wishlist
  const handleRemoveFromWishlist = (productId, productName) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
    dispatch(showNotification({
      type: 'success',
      title: 'Removed from Wishlist',
      message: `${productName} removed from wishlist`
    }));
  };
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <Heart size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Please Sign In</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your wishlist.
          </p>
          <a
            href="/auth/login"
            className="inline-block bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }
  
  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <Heart size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-6">
            Save items you love to your wishlist and shop them later.
          </p>
          <a
            href="/"
            className="inline-block bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Start Shopping
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Wishlist ({wishlistItems.length} items)
        </h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {wishlistItems.map((item) => {
          const discountPercentage = item.originalPrice 
            ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
            : 0;
          
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                
                {/* Discount badge */}
                {discountPercentage > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    -{discountPercentage}%
                  </div>
                )}
                
                {/* Remove button */}
                <button
                  onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
              
              {/* Product Details */}
              <div className="p-4">
                
                {/* Brand */}
                {item.brand && (
                  <div className="text-sm text-gray-500 mb-1">{item.brand}</div>
                )}
                
                {/* Product name */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.name}
                </h3>
                
                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{item.price.toLocaleString()}
                  </span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                
                {/* Stock status */}
                <div className="mb-3">
                  {item.inStock ? (
                    <span className="text-sm text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                  )}
                </div>
                
                {/* Add to cart button */}
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.inStock}
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                    item.inStock
                      ? 'bg-orange-400 hover:bg-orange-500 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPage;