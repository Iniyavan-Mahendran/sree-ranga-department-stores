/**
 * Shopping Cart Slice
 * This manages everything related to the shopping cart
 * Like a smart shopping basket that remembers what you put in it
 */

import { createSlice } from '@reduxjs/toolkit';

// Initial state - what the cart looks like when empty
const initialState = {
  items: [],        // Array of cart items (like a list of things in your basket)
  totalItems: 0,    // Total number of items (like counting all items)
  totalPrice: 0,    // Total price of all items (like adding up the bill)
  isOpen: false,    // Is cart sidebar open? (like checking if basket is open or closed)
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a new item to cart or increase quantity if it exists
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Item already in cart, just increase quantity (like adding more of the same thing)
        existingItem.quantity += 1;
      } else {
        // New item, add to cart (like putting a new item in your basket)
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }
      
      // Recalculate totals (like updating the receipt)
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    // Remove item completely from cart
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    // Update quantity of an item
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less (like taking it out of basket)
          state.items = state.items.filter(item => item.id !== id);
        }
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    // Clear entire cart (like emptying your basket)
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
    
    // Toggle cart sidebar open/closed (like opening or closing your basket)
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    // Calculate total items and price (like adding up your bill)
    calculateTotals: (state) => {
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleCart 
} = cartSlice.actions;

export default cartSlice.reducer;