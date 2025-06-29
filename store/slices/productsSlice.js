/**
 * Products Slice
 * This manages all products data, search, filters, and categories
 * Think of it like a smart catalog that can find and organize products
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],           // All products (like a complete inventory list)
  categories: [],         // All categories (like different sections in a store)
  filteredProducts: [],   // Products after applying filters (like search results)
  searchQuery: '',        // Current search term (what user is looking for)
  selectedCategory: 'all', // Currently selected category (which section user is browsing)
  sortBy: 'name',         // How to sort products (by name, price, rating, etc.)
  loading: false,         // Is data loading? (like waiting for inventory to load)
  error: null,           // Any errors (like "couldn't load products")
  priceRange: [0, 20000], // Price filter range (minimum and maximum price)
  filters: {             // Additional filters
    inStock: null,       // Show only in-stock items?
    rating: null,        // Minimum rating filter
    brand: null,         // Filter by brand
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Set all products (usually from API or mock data)
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload; // Initially show all products
      // Apply current filters after setting products
      productsSlice.caseReducers.filterProducts(state);
    },
    
    // Set categories (different sections like groceries, electronics)
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    
    // Update search query and filter products
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      productsSlice.caseReducers.filterProducts(state);
    },
    
    // Select a category (like choosing a store section)
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      productsSlice.caseReducers.filterProducts(state);
    },
    
    // Change sort order (like organizing products differently)
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      productsSlice.caseReducers.sortProducts(state);
    },
    
    // Set price range filter (like setting a budget)
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
      productsSlice.caseReducers.filterProducts(state);
    },
    
    // Set additional filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      productsSlice.caseReducers.filterProducts(state);
    },
    
    // Filter products based on search, category, price, and other filters
    filterProducts: (state) => {
      let filtered = [...state.products]; // Start with all products
      
      // Filter by search query (like looking for specific items)
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (product.brand && product.brand.toLowerCase().includes(query))
        );
      }
      
      // Filter by category (like choosing a store section)
      if (state.selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === state.selectedCategory);
      }
      
      // Filter by price range (like setting a budget)
      filtered = filtered.filter(product => 
        product.price >= state.priceRange[0] && product.price <= state.priceRange[1]
      );
      
      // Filter by stock status (only show available items)
      if (state.filters.inStock === true) {
        filtered = filtered.filter(product => product.inStock);
      }
      
      // Filter by minimum rating (only show highly rated items)
      if (state.filters.rating) {
        filtered = filtered.filter(product => product.rating >= state.filters.rating);
      }
      
      // Filter by brand (only show specific brands)
      if (state.filters.brand) {
        filtered = filtered.filter(product => product.brand === state.filters.brand);
      }
      
      state.filteredProducts = filtered;
      productsSlice.caseReducers.sortProducts(state);
    },
    
    // Sort products (like organizing them in different orders)
    sortProducts: (state) => {
      const sorted = [...state.filteredProducts];
      
      switch (state.sortBy) {
        case 'price-low':
          // Sort by price: cheapest first (like sorting by budget)
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          // Sort by price: most expensive first (like sorting by luxury)
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          // Sort alphabetically (like organizing a dictionary)
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'rating':
          // Sort by rating: highest rated first (like sorting by quality)
          sorted.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // Sort by newest first (like showing latest arrivals)
          sorted.sort((a, b) => b.id - a.id);
          break;
        case 'popularity':
          // Sort by number of reviews (like sorting by popularity)
          sorted.sort((a, b) => b.reviews - a.reviews);
          break;
        default:
          break;
      }
      
      state.filteredProducts = sorted;
    },
    
    // Set loading state (like showing a "please wait" message)
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    // Set error state (like showing an error message)
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // Clear all filters (like resetting search)
    clearFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'all';
      state.priceRange = [0, 20000];
      state.filters = {
        inStock: null,
        rating: null,
        brand: null,
      };
      state.filteredProducts = state.products;
      productsSlice.caseReducers.sortProducts(state);
    },
    
    // Add a product to favorites (for future use)
    addToFavorites: (state, action) => {
      const productId = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (product) {
        product.isFavorite = true;
      }
    },
    
    // Remove a product from favorites
    removeFromFavorites: (state, action) => {
      const productId = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (product) {
        product.isFavorite = false;
      }
    },
  },
});

export const {
  setProducts,
  setCategories,
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  setPriceRange,
  setFilters,
  filterProducts,
  setLoading,
  setError,
  clearFilters,
  addToFavorites,
  removeFromFavorites,
} = productsSlice.actions;

export default productsSlice.reducer;