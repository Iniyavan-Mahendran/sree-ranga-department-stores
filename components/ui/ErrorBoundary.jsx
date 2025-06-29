/**
 * Error Boundary Component
 * This catches JavaScript errors and shows a nice error page instead of a broken website
 * Think of it like a safety net that catches problems before users see them
 */

'use client';

import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // Initial state - no error
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }
  
  // This method is called when an error happens
  static getDerivedStateFromError(error) {
    // Update state to show error UI
    return { hasError: true };
  }
  
  // This method is called after an error is caught
  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Save error details in state
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // In production, you might want to send error to a logging service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error tracking service
      // logErrorToService(error, errorInfo);
    }
  }
  
  // Try to recover from error (like restarting)
  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });
  };
  
  // Go back to home page
  handleGoHome = () => {
    window.location.href = '/';
  };
  
  render() {
    // If there's an error, show error page
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            
            {/* Error icon */}
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            
            {/* Error title */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Oops! Something went wrong
            </h2>
            
            {/* Error message */}
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We're sorry, but something unexpected happened. Don't worry, our team has been notified and we're working to fix it.
            </p>
            
            {/* Error details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 rounded-lg text-left">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                  Error Details (Development Only):
                </h3>
                <p className="text-xs text-red-700 dark:text-red-300 font-mono">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
            
            {/* Action buttons */}
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw size={16} />
                <span>Try Again</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2"
              >
                <Home size={16} />
                <span>Go to Homepage</span>
              </button>
            </div>
            
            {/* Support info */}
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              <p>
                If this problem continues, please contact our support team at{' '}
                <a 
                  href="mailto:support@sreeranga.com" 
                  className="text-orange-600 hover:text-orange-700 underline"
                >
                  support@sreeranga.com
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;