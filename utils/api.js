/**
 * API Helper Functions
 * These functions help us talk to our backend server
 * Think of them like messengers that carry information back and forth
 */

// Base URL for our API (like the address of our server)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

/**
 * Make API requests (like sending a letter and waiting for a reply)
 * @param {string} endpoint - Where to send the request (like an address)
 * @param {object} options - How to send it (like express mail vs regular mail)
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default settings for our request
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  
  // Add authentication token if user is logged in
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(url, config);
    
    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Convert response to JSON (like opening a letter and reading it)
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * Authentication API functions
 * These help users log in and create accounts
 */
export const authAPI = {
  // User login (like showing your ID card)
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  // User registration (like filling out a membership form)
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  // Refresh authentication token (like renewing your ID card)
  refreshToken: async () => {
    return apiRequest('/auth/refresh', {
      method: 'POST',
    });
  },
};

/**
 * Products API functions
 * These help us get information about products
 */
export const productsAPI = {
  // Get all products (like getting a catalog)
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
  },
  
  // Get a specific product (like looking up one item)
  getById: async (id) => {
    return apiRequest(`/products/${id}`);
  },
  
  // Search for products (like using a search function in a catalog)
  search: async (query, filters = {}) => {
    const params = { q: query, ...filters };
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/products/search?${queryString}`);
  },
  
  // Get products by category (like looking at one section of the store)
  getByCategory: async (categoryId) => {
    return apiRequest(`/categories/${categoryId}/products`);
  },
};

/**
 * Categories API functions
 * These help us get information about product categories
 */
export const categoriesAPI = {
  // Get all categories (like getting a list of all store sections)
  getAll: async () => {
    return apiRequest('/categories');
  },
  
  // Get a specific category (like getting info about one section)
  getById: async (id) => {
    return apiRequest(`/categories/${id}`);
  },
};

/**
 * Cart API functions
 * These help manage the shopping cart
 */
export const cartAPI = {
  // Get user's cart (like checking what's in your shopping basket)
  get: async () => {
    return apiRequest('/cart');
  },
  
  // Add item to cart (like putting something in your basket)
  addItem: async (productId, quantity = 1) => {
    return apiRequest('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },
  
  // Update item quantity (like changing how many of something you want)
  updateItem: async (itemId, quantity) => {
    return apiRequest(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },
  
  // Remove item from cart (like taking something out of your basket)
  removeItem: async (itemId) => {
    return apiRequest(`/cart/items/${itemId}`, {
      method: 'DELETE',
    });
  },
  
  // Clear entire cart (like emptying your basket)
  clear: async () => {
    return apiRequest('/cart/clear', {
      method: 'DELETE',
    });
  },
};

/**
 * Orders API functions
 * These help manage orders and purchases
 */
export const ordersAPI = {
  // Create a new order (like going to checkout)
  create: async (orderData) => {
    return apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },
  
  // Get user's orders (like checking your purchase history)
  getAll: async () => {
    return apiRequest('/orders');
  },
  
  // Get a specific order (like looking up one purchase)
  getById: async (orderId) => {
    return apiRequest(`/orders/${orderId}`);
  },
  
  // Update order status (usually done by store staff)
  updateStatus: async (orderId, status) => {
    return apiRequest(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

/**
 * User API functions
 * These help manage user profiles and settings
 */
export const userAPI = {
  // Get user profile (like checking your account info)
  getProfile: async () => {
    return apiRequest('/user/profile');
  },
  
  // Update user profile (like editing your account info)
  updateProfile: async (userData) => {
    return apiRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
  
  // Change password (like updating your account security)
  changePassword: async (oldPassword, newPassword) => {
    return apiRequest('/user/change-password', {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  },
};

/**
 * Error handling helper
 * This helps us deal with problems when talking to the server
 */
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  
  // Different types of errors and what they mean
  if (error.message.includes('401')) {
    // User needs to log in again
    localStorage.removeItem('authToken');
    window.location.href = '/auth/login';
    return 'Please log in again';
  } else if (error.message.includes('403')) {
    // User doesn't have permission
    return 'You don\'t have permission to do this';
  } else if (error.message.includes('404')) {
    // Something wasn't found
    return 'The requested item was not found';
  } else if (error.message.includes('500')) {
    // Server problem
    return 'Server error. Please try again later';
  } else {
    // General error
    return 'Something went wrong. Please try again';
  }
};

/**
 * Mock API functions for development
 * These simulate server responses when we don't have a real server
 */
export const mockAPI = {
  // Simulate getting products from local data
  getProducts: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const response = await fetch('/mocks/products.json');
      return await response.json();
    } catch (error) {
      console.error('Failed to load mock products:', error);
      return [];
    }
  },
  
  // Simulate getting categories from local data
  getCategories: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const response = await fetch('/mocks/categories.json');
      return await response.json();
    } catch (error) {
      console.error('Failed to load mock categories:', error);
      return [];
    }
  },
};