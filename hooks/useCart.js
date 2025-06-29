/**
 * Cart Hook
 * This is a custom hook that helps components work with the shopping cart
 * Think of it like a shopping assistant that helps you manage your cart
 */

import { useSelector, useDispatch } from 'react-redux';
import { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleCart 
} from '@/store/slices/cartSlice';
import { showNotification } from '@/store/slices/uiSlice';

/**
 * Custom hook for cart management
 * This hook provides cart state and functions to components
 */
export const useCart = () => {
  const dispatch = useDispatch();
  
  // Get cart state from Redux store
  const { 
    items, 
    totalItems, 
    totalPrice, 
    isOpen 
  } = useSelector((state) => state.cart);
  
  /**
   * Add item to cart with notification
   * @param {object} product - Product to add
   * @param {number} quantity - Quantity to add (default: 1)
   */
  const addItem = (product, quantity = 1) => {
    // Add multiple quantities if specified
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    
    // Show success notification
    dispatch(showNotification({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} ${quantity > 1 ? `(${quantity})` : ''} added to cart!`
    }));
  };
  
  /**
   * Remove item from cart with notification
   * @param {number} productId - ID of product to remove
   * @param {string} productName - Name of product (for notification)
   */
  const removeItem = (productId, productName) => {
    dispatch(removeFromCart(productId));
    
    // Show success notification
    dispatch(showNotification({
      type: 'success',
      title: 'Removed from Cart',
      message: `${productName} removed from cart`
    }));
  };
  
  /**
   * Update item quantity
   * @param {number} productId - ID of product to update
   * @param {number} newQuantity - New quantity
   */
  const updateItemQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // If quantity is 0 or less, remove the item
      const item = items.find(item => item.id === productId);
      if (item) {
        removeItem(productId, item.name);
      }
    } else {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    }
  };
  
  /**
   * Clear entire cart with confirmation
   */
  const clearAllItems = () => {
    if (items.length > 0) {
      dispatch(clearCart());
      dispatch(showNotification({
        type: 'success',
        title: 'Cart Cleared',
        message: 'All items removed from cart'
      }));
    }
  };
  
  /**
   * Toggle cart sidebar
   */
  const toggleCartSidebar = () => {
    dispatch(toggleCart());
  };
  
  /**
   * Check if product is in cart
   * @param {number} productId - ID of product to check
   * @returns {boolean} - True if product is in cart
   */
  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };
  
  /**
   * Get quantity of specific product in cart
   * @param {number} productId - ID of product
   * @returns {number} - Quantity in cart (0 if not in cart)
   */
  const getItemQuantity = (productId) => {
    const item = items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };
  
  /**
   * Get cart item by product ID
   * @param {number} productId - ID of product
   * @returns {object|null} - Cart item or null if not found
   */
  const getCartItem = (productId) => {
    return items.find(item => item.id === productId) || null;
  };
  
  /**
   * Calculate total savings (original price - current price)
   * @returns {number} - Total amount saved
   */
  const getTotalSavings = () => {
    return items.reduce((savings, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        const itemSavings = (item.originalPrice - item.price) * item.quantity;
        return savings + itemSavings;
      }
      return savings;
    }, 0);
  };
  
  /**
   * Check if cart qualifies for free shipping
   * @param {number} threshold - Free shipping threshold (default: 499)
   * @returns {boolean} - True if qualifies for free shipping
   */
  const qualifiesForFreeShipping = (threshold = 499) => {
    return totalPrice >= threshold;
  };
  
  /**
   * Get amount needed for free shipping
   * @param {number} threshold - Free shipping threshold (default: 499)
   * @returns {number} - Amount needed (0 if already qualifies)
   */
  const getAmountForFreeShipping = (threshold = 499) => {
    return Math.max(0, threshold - totalPrice);
  };
  
  /**
   * Get cart summary for checkout
   * @returns {object} - Cart summary with totals
   */
  const getCartSummary = () => {
    const subtotal = totalPrice;
    const savings = getTotalSavings();
    const shipping = qualifiesForFreeShipping() ? 0 : 50;
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + shipping + tax;
    
    return {
      subtotal,
      savings,
      shipping,
      tax,
      total,
      itemCount: totalItems,
      qualifiesForFreeShipping: qualifiesForFreeShipping()
    };
  };
  
  // Return all cart-related data and functions
  return {
    // State
    items,
    totalItems,
    totalPrice,
    isOpen,
    
    // Actions
    addItem,
    removeItem,
    updateItemQuantity,
    clearAllItems,
    toggleCartSidebar,
    
    // Helper functions
    isInCart,
    getItemQuantity,
    getCartItem,
    getTotalSavings,
    qualifiesForFreeShipping,
    getAmountForFreeShipping,
    getCartSummary,
  };
};