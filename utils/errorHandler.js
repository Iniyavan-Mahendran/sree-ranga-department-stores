/**
 * Error Handler Utilities
 * These functions help us deal with errors in a nice way
 * Like having a first aid kit for when things go wrong
 */

/**
 * Log errors to console and external services
 * @param {Error} error - The error that happened
 * @param {string} context - Where the error happened
 */
export const logError = (error, context = 'Unknown') => {
  // Log to console for development
  console.error(`Error in ${context}:`, error);
  
  // In production, you might want to send errors to a service like Sentry
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to error tracking service
    // Sentry.captureException(error, { tags: { context } });
  }
};

/**
 * Get user-friendly error message
 * @param {Error} error - The error object
 * @returns {string} - User-friendly message
 */
export const getErrorMessage = (error) => {
  // Network errors (when internet is not working)
  if (error.name === 'NetworkError' || error.message.includes('fetch')) {
    return 'Please check your internet connection and try again.';
  }
  
  // Authentication errors (when user needs to log in)
  if (error.message.includes('401') || error.message.includes('unauthorized')) {
    return 'Please log in to continue.';
  }
  
  // Permission errors (when user can't do something)
  if (error.message.includes('403') || error.message.includes('forbidden')) {
    return 'You don\'t have permission to do this.';
  }
  
  // Not found errors (when something doesn't exist)
  if (error.message.includes('404') || error.message.includes('not found')) {
    return 'The requested item was not found.';
  }
  
  // Server errors (when our server has problems)
  if (error.message.includes('500') || error.message.includes('server error')) {
    return 'Our servers are having issues. Please try again later.';
  }
  
  // Validation errors (when user input is wrong)
  if (error.message.includes('validation') || error.message.includes('invalid')) {
    return 'Please check your input and try again.';
  }
  
  // Default error message
  return 'Something went wrong. Please try again.';
};

/**
 * Handle API errors consistently
 * @param {Error} error - The API error
 * @param {Function} showNotification - Function to show notifications
 */
export const handleAPIError = (error, showNotification) => {
  const message = getErrorMessage(error);
  logError(error, 'API');
  
  if (showNotification) {
    showNotification({
      type: 'error',
      title: 'Error',
      message: message
    });
  }
  
  return message;
};

/**
 * Handle form validation errors
 * @param {object} errors - Validation errors object
 * @returns {string} - First error message
 */
export const getFirstValidationError = (errors) => {
  const errorKeys = Object.keys(errors);
  if (errorKeys.length === 0) return null;
  
  return errors[errorKeys[0]];
};

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Initial delay in milliseconds
 */
export const retryWithBackoff = async (fn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error; // Last attempt failed
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
};

/**
 * Safe async function wrapper
 * @param {Function} fn - Async function to wrap
 * @returns {Function} - Wrapped function that won't throw
 */
export const safeAsync = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      logError(error, 'SafeAsync');
      return null;
    }
  };
};

/**
 * Check if error is recoverable
 * @param {Error} error - The error to check
 * @returns {boolean} - True if error can be retried
 */
export const isRecoverableError = (error) => {
  // Network errors are usually recoverable
  if (error.name === 'NetworkError' || error.message.includes('fetch')) {
    return true;
  }
  
  // Server errors might be temporary
  if (error.message.includes('500') || error.message.includes('503')) {
    return true;
  }
  
  // Timeout errors can be retried
  if (error.message.includes('timeout')) {
    return true;
  }
  
  return false;
};

/**
 * Format error for display
 * @param {Error} error - The error to format
 * @returns {object} - Formatted error object
 */
export const formatError = (error) => {
  return {
    message: getErrorMessage(error),
    timestamp: new Date().toISOString(),
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    recoverable: isRecoverableError(error)
  };
};

/**
 * Global error handler for unhandled errors
 */
export const setupGlobalErrorHandler = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logError(event.reason, 'UnhandledPromiseRejection');
    event.preventDefault(); // Prevent default browser error handling
  });
  
  // Handle general JavaScript errors
  window.addEventListener('error', (event) => {
    logError(event.error, 'GlobalError');
  });
};

/**
 * Error boundary helper for React components
 */
export const withErrorBoundary = (Component, fallback) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
      logError(error, 'ComponentError');
    }
    
    render() {
      if (this.state.hasError) {
        return fallback || <div>Something went wrong.</div>;
      }
      
      return <Component {...this.props} />;
    }
  };
};