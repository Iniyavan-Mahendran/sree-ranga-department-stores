/**
 * Application Constants
 * These are like the basic rules and settings for our entire application
 * Think of them like the constitution of our website - they don't change often
 */

// Main application information (like a business card)
export const APP_CONFIG = {
  name: 'Sree Ranga Department Stores',
  shortName: 'Sree Ranga',
  description: 'Your trusted shopping partner for 30 years',
  version: '1.0.0',
  author: 'Sree Ranga Team',
  email: 'info@sreeranga.com',
  phone: '+91 89712 90721',
  address: '10-A, Nethaji By Pass Road, Dharmapuri - 636701',
  website: 'https://sreeranga.com',
  
  // Social media links (like our online presence)
  socialMedia: {
    facebook: 'https://facebook.com/sreeranga',
    twitter: 'https://twitter.com/sreeranga',
    instagram: 'https://instagram.com/sreeranga',
    youtube: 'https://youtube.com/sreeranga'
  },
  
  // Business information
  established: 1994,
  branches: 5,
  yearsInBusiness: new Date().getFullYear() - 1994
};

// All the pages in our website (like a map of our website)
export const ROUTES = {
  // Main pages
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  
  // Shopping pages
  PRODUCTS: '/products',
  CATEGORIES: '/category',
  CART: '/cart',
  CHECKOUT: '/checkout',
  WISHLIST: '/wishlist',
  
  // User pages
  PROFILE: '/profile',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  
  // Special pages
  SEARCH: '/search',
  ORDERS: '/orders',
  HELP: '/help',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  RETURNS: '/returns',
  SHIPPING: '/shipping',
  TRACK: '/track',
  
  // Business pages
  BULK: '/bulk',
  CAREERS: '/careers',
  INVESTOR: '/investor',
  PRESS: '/press',
  
  // Special sections
  DEALS: '/deals',
  BESTSELLERS: '/bestsellers',
  NEW_RELEASES: '/new-releases',
  FRESH: '/fresh',
  FASHION: '/fashion',
  ELECTRONICS: '/electronics',
  
  // Payment pages
  PAYMENT_SUCCESS: '/payment/success',
  PAYMENT_FAILURE: '/payment/failure'
};

// Theme options (like choosing between day and night mode)
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

// Language options (like choosing which language to speak)
export const LANGUAGES = {
  ENGLISH: 'en',
  HINDI: 'hi',
  TAMIL: 'ta'
};

// Types of notification messages (like different types of alerts)
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',  // Good news (like "Order placed successfully!")
  ERROR: 'error',      // Bad news (like "Payment failed")
  WARNING: 'warning',  // Caution (like "Low stock")
  INFO: 'info'         // Information (like "New feature available")
};

// Order status options (like tracking a package)
export const ORDER_STATUS = {
  PENDING: 'pending',       // Order just placed
  CONFIRMED: 'confirmed',   // Order confirmed by store
  PROCESSING: 'processing', // Being prepared
  SHIPPED: 'shipped',       // On the way
  DELIVERED: 'delivered',   // Reached customer
  CANCELLED: 'cancelled'    // Order cancelled
};

// Payment method options (like different ways to pay)
export const PAYMENT_METHODS = {
  CARD: 'card',                    // Credit/Debit card
  UPI: 'upi',                     // UPI payment
  NET_BANKING: 'net_banking',     // Online banking
  COD: 'cod',                     // Cash on delivery
  WALLET: 'wallet'                // Digital wallet
};

// Delivery zones (like different areas we deliver to)
export const DELIVERY_ZONES = {
  LOCAL: 'local',       // Same city (fast delivery)
  REGIONAL: 'regional', // Nearby cities
  STATE: 'state',       // Within Tamil Nadu
  NATIONAL: 'national'  // All over India
};

// Product categories (like different sections in our store)
export const PRODUCT_CATEGORIES = {
  GROCERIES: 'groceries',
  FMCG: 'fmcg',
  MEDICINES: 'medicines',
  BAKERY: 'bakery',
  SHOES: 'shoes',
  DRESSES: 'dresses',
  KITCHENWARE: 'kitchenware',
  STATIONERY: 'stationery',
  GAMES: 'games',
  GYM: 'gym',
  BEAUTY: 'beauty',
  ELECTRONICS: 'electronics'
};

// API endpoints (like addresses for different services)
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // Products
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  SEARCH: '/products/search',
  
  // Cart and Orders
  CART: '/cart',
  ORDERS: '/orders',
  
  // User
  PROFILE: '/user/profile',
  CHANGE_PASSWORD: '/user/change-password'
};

// Local storage keys (like labels for storing information)
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  CART: 'cart',
  WISHLIST: 'wishlist'
};

// Default values (like standard settings)
export const DEFAULTS = {
  ITEMS_PER_PAGE: 20,
  SEARCH_DEBOUNCE_DELAY: 300, // Wait 300ms before searching
  NOTIFICATION_DURATION: 5000, // Show notifications for 5 seconds
  MAX_CART_QUANTITY: 10,
  MIN_ORDER_VALUE: 100,
  FREE_SHIPPING_THRESHOLD: 499
};

// Error messages (like a dictionary of error explanations)
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Please check your internet connection and try again.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You don\'t have permission to do this.',
  NOT_FOUND: 'The requested item was not found.',
  SERVER_ERROR: 'Our servers are having issues. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  PAYMENT_FAILED: 'Payment could not be processed. Please try again.',
  OUT_OF_STOCK: 'This item is currently out of stock.'
};

// Success messages (like a dictionary of good news)
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back! You have been logged in successfully.',
  REGISTER_SUCCESS: 'Account created successfully! Welcome to Sree Ranga.',
  ORDER_PLACED: 'Your order has been placed successfully!',
  PAYMENT_SUCCESS: 'Payment completed successfully.',
  PROFILE_UPDATED: 'Your profile has been updated.',
  ITEM_ADDED_TO_CART: 'Item added to cart successfully.',
  ITEM_REMOVED_FROM_CART: 'Item removed from cart.'
};

// Regular expressions for validation (like rules for checking information)
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+91[\-\s]?)?[0]?(91)?[6-9]\d{9}$/,
  PINCODE: /^[1-9][0-9]{5}$/,
  CARD_NUMBER: /^\d{13,19}$/,
  CVV: /^\d{3,4}$/
};

// Feature flags (like switches to turn features on/off)
export const FEATURE_FLAGS = {
  DARK_MODE: true,
  MULTI_LANGUAGE: true,
  WISHLIST: true,
  REVIEWS: true,
  NOTIFICATIONS: true,
  BULK_ORDERS: true,
  LIVE_CHAT: false, // Not implemented yet
  VOICE_SEARCH: false // Future feature
};