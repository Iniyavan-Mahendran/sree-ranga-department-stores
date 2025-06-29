/**
 * UI Slice
 * This manages general UI state like sidebars, modals, theme, etc.
 * Think of it like the control panel for how the website looks and behaves
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,    // Is main sidebar open? (like a drawer being open or closed)
  mobileMenuOpen: false, // Is mobile menu open? (for phones and tablets)
  theme: 'light',        // Light or dark theme (like choosing day or night mode)
  language: 'en',        // Current language (English, Hindi, Tamil)
  loading: false,        // Global loading state (is something loading?)
  notification: null,    // Current notification message (popup messages)
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Toggle sidebar open/closed (like opening and closing a drawer)
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    
    // Toggle mobile menu open/closed (for phone users)
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    
    // Set theme (light or dark mode)
    setTheme: (state, action) => {
      state.theme = action.payload;
      // Apply theme to document and save to localStorage (like remembering your preference)
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', action.payload === 'dark');
        localStorage.setItem('theme', action.payload);
      }
    },
    
    // Set language (English, Hindi, Tamil)
    setLanguage: (state, action) => {
      state.language = action.payload;
      // Save language preference (like remembering which language you prefer)
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('language', action.payload);
      }
    },
    
    // Set global loading state (when the whole app is loading)
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    // Show notification (like showing a popup message)
    showNotification: (state, action) => {
      state.notification = {
        id: Date.now(), // Unique ID for this notification
        type: action.payload.type || 'info', // success, error, warning, info
        title: action.payload.title,
        message: action.payload.message,
        timestamp: new Date().toISOString()
      };
    },
    
    // Hide notification (like closing a popup message)
    hideNotification: (state) => {
      state.notification = null;
    },
    
    // Close all open menus and sidebars (like closing all drawers)
    closeAllMenus: (state) => {
      state.sidebarOpen = false;
      state.mobileMenuOpen = false;
    },
  },
});

export const {
  toggleSidebar,
  toggleMobileMenu,
  setTheme,
  setLanguage,
  setLoading,
  showNotification,
  hideNotification,
  closeAllMenus,
} = uiSlice.actions;

export default uiSlice.reducer;