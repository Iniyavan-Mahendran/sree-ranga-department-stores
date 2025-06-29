/**
 * Cart Sidebar Component
 * This shows the shopping cart in a sidebar overlay
 * Allows users to view, update, and remove items
 */

'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { toggleCart, removeFromCart, updateQuantity } from '@/store/slices/cartSlice';

const CartSidebar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const { items, totalItems, totalPrice, isOpen } = useSelector((state) => state.cart);
  
  // Handle quantity update
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(itemId));
    } else {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    }
  };
  
  // Handle item removal
  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  
  // Handle checkout
  const handleCheckout = () => {
    dispatch(toggleCart());
    window.location.href = '/checkout';
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="absolute right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
        
        {/* Cart header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {t('cart.shopping_cart')} ({totalItems})
          </h2>
          <button
            onClick={() => dispatch(toggleCart())}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {t('cart.empty_cart')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add some products to get started
              </p>
              <button
                onClick={() => dispatch(toggleCart())}
                className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-md transition-colors"
              >
                {t('cart.continue_shopping')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  
                  {/* Product image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  {/* Product details */}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{item.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.brand}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">₹{item.price}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Quantity controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Cart footer */}
        {items.length > 0 && (
          <div className="border-t dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t('cart.total')}:
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-md font-medium transition-colors"
            >
              {t('cart.checkout')}
            </button>
            
            <button
              onClick={() => dispatch(toggleCart())}
              className="w-full mt-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 py-2 rounded-md font-medium transition-colors"
            >
              {t('cart.continue_shopping')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;