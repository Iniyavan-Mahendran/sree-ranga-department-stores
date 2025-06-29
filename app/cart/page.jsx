/**
 * Cart Page
 * This shows all items in the shopping cart
 * Users can update quantities, remove items, and proceed to checkout
 */

'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { showNotification } from '@/store/slices/uiSlice';

const CartPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useSelector((state) => state.cart);
  
  // Handle quantity update
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(itemId));
      dispatch(showNotification({
        type: 'success',
        title: 'Item Removed',
        message: 'Item removed from cart'
      }));
    } else {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    }
  };
  
  // Handle item removal
  const handleRemoveItem = (itemId, itemName) => {
    dispatch(removeFromCart(itemId));
    dispatch(showNotification({
      type: 'success',
      title: 'Item Removed',
      message: `${itemName} removed from cart`
    }));
  };
  
  // Handle clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(showNotification({
      type: 'success',
      title: 'Cart Cleared',
      message: 'All items removed from cart'
    }));
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Shopping Cart ({totalItems} items)
        </h1>
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          Clear Cart
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start space-x-4">
                
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                
                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                  {item.brand && (
                    <p className="text-sm text-gray-600 mb-2">by {item.brand}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{item.price}
                    </span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.originalPrice}
                      </span>
                    )}
                    {item.inStock ? (
                      <span className="text-sm text-green-600 font-medium">In Stock</span>
                    ) : (
                      <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                    )}
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-700">Qty:</span>
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
                
                {/* Item Total */}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">₹{Math.round(totalPrice * 0.18).toLocaleString()}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{Math.round(totalPrice * 1.18).toLocaleString()}</span>
              </div>
            </div>
            
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-md transition-colors mb-3">
              Proceed to Checkout
            </button>
            
            <a
              href="/"
              className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 rounded-md transition-colors"
            >
              Continue Shopping
            </a>
            
            <div className="mt-4 text-sm text-gray-600">
              <p>• Free delivery on orders above ₹499</p>
              <p>• Easy 30-day returns</p>
              <p>• Secure payment options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;