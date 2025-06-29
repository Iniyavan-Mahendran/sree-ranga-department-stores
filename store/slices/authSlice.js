/**
 * Authentication Slice
 * This manages user login/logout state and user information
 * Think of it like a security guard that remembers who is allowed in
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,           // User information when logged in (like an ID card)
  isAuthenticated: false, // Is user logged in? (like checking if someone has a valid ticket)
  loading: false,       // Is authentication in progress? (like waiting for ID verification)
  error: null,          // Any authentication errors (like "wrong password")
  token: null,          // Authentication token (like a temporary pass)
  refreshToken: null,   // Token for refreshing authentication (like renewing a pass)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Start login process (like beginning to check someone's ID)
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Login successful (like approving someone's entry)
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user || action.payload; // User info
      state.token = action.payload.token; // Authentication token
      state.refreshToken = action.payload.refreshToken; // Refresh token
      state.error = null;
      
      // Save to localStorage so user stays logged in (like remembering a regular customer)
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('authToken', state.token);
        localStorage.setItem('refreshToken', state.refreshToken);
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    
    // Login failed (like rejecting someone's entry)
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.error = action.payload;
    },
    
    // User logs out (like someone leaving the building)
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.token = null;
      state.refreshToken = null;
      
      // Clear from localStorage (like removing their entry record)
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
    },
    
    // Update user information (like updating someone's profile)
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      
      // Update localStorage (like updating their record)
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    
    // Restore authentication from localStorage (like recognizing a returning customer)
    restoreAuth: (state) => {
      if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('authToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const user = localStorage.getItem('user');
        
        if (token && user) {
          state.isAuthenticated = true;
          state.token = token;
          state.refreshToken = refreshToken;
          state.user = JSON.parse(user);
        }
      }
    },
    
    // Clear any errors (like clearing a warning message)
    clearError: (state) => {
      state.error = null;
    },
    
    // Set loading state (like showing a "please wait" sign)
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateUser,
  restoreAuth,
  clearError,
  setLoading
} = authSlice.actions;

export default authSlice.reducer;