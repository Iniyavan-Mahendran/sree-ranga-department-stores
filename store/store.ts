/**
 * Redux Store Configuration
 * This file sets up our main Redux store that manages all app state
 * Think of this as the main brain that remembers everything in our app
 */

import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import authSlice from './slices/authSlice';
import productsSlice from './slices/productsSlice';
import uiSlice from './slices/uiSlice';

// Create the main store that holds all our app's data
export const store = configureStore({
  reducer: {
    cart: cartSlice,        // Shopping cart items and quantities
    auth: authSlice,        // User login/logout state
    products: productsSlice, // All products data and filters
    ui: uiSlice,           // UI state like sidebar open/closed
  },
});

// Export types for TypeScript (so we know what shape our data has)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;