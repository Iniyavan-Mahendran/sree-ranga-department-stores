/**
 * Authentication Hook
 * This is a custom hook that helps components work with user authentication
 * Think of it like a helper that handles all login/logout related tasks
 */

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { restoreAuth, logout } from '@/store/slices/authSlice';
import { showNotification } from '@/store/slices/uiSlice';

/**
 * Custom hook for authentication
 * This hook provides authentication state and functions to components
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  
  // Get authentication state from Redux store
  const { 
    user, 
    isAuthenticated, 
    loading, 
    error, 
    token 
  } = useSelector((state) => state.auth);
  
  // Restore authentication when app starts (like remembering a logged-in user)
  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);
  
  // Check if token is expired and logout if needed
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      dispatch(logout());
      dispatch(showNotification({
        type: 'warning',
        title: 'Session Expired',
        message: 'Please log in again to continue.'
      }));
    }
  }, [token, dispatch]);
  
  /**
   * Check if user has a specific role or permission
   * @param {string} role - Role to check for
   * @returns {boolean} - True if user has the role
   */
  const hasRole = (role) => {
    return user?.roles?.includes(role) || false;
  };
  
  /**
   * Check if user is admin
   * @returns {boolean} - True if user is admin
   */
  const isAdmin = () => {
    return hasRole('admin');
  };
  
  /**
   * Get user's display name
   * @returns {string} - User's name or email
   */
  const getDisplayName = () => {
    return user?.name || user?.email || 'Guest';
  };
  
  /**
   * Check if user's email is verified
   * @returns {boolean} - True if email is verified
   */
  const isEmailVerified = () => {
    return user?.emailVerified || false;
  };
  
  /**
   * Logout user and show notification
   */
  const handleLogout = () => {
    dispatch(logout());
    dispatch(showNotification({
      type: 'success',
      title: 'Logged Out',
      message: 'You have been successfully logged out.'
    }));
  };
  
  // Return all authentication-related data and functions
  return {
    // State
    user,
    isAuthenticated,
    loading,
    error,
    token,
    
    // Helper functions
    hasRole,
    isAdmin,
    getDisplayName,
    isEmailVerified,
    handleLogout,
  };
};

/**
 * Helper function to check if JWT token is expired
 * @param {string} token - JWT token to check
 * @returns {boolean} - True if token is expired
 */
const isTokenExpired = (token) => {
  try {
    // Decode JWT token (basic decoding, not verification)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    // Check if token is expired
    return payload.exp < currentTime;
  } catch (error) {
    // If we can't decode the token, consider it expired
    return true;
  }
};

/**
 * Hook for protecting routes that require authentication
 * @param {string} redirectTo - Where to redirect if not authenticated
 */
export const useRequireAuth = (redirectTo = '/auth/login') => {
  const { isAuthenticated, loading } = useAuth();
  
  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!loading && !isAuthenticated) {
      window.location.href = redirectTo;
    }
  }, [isAuthenticated, loading, redirectTo]);
  
  return { isAuthenticated, loading };
};

/**
 * Hook for protecting admin routes
 */
export const useRequireAdmin = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        window.location.href = '/auth/login';
      } else if (!isAdmin()) {
        window.location.href = '/';
      }
    }
  }, [isAuthenticated, isAdmin, loading]);
  
  return { isAuthenticated, isAdmin: isAdmin(), loading };
};