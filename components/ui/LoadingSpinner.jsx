/**
 * Loading Spinner Component
 * This shows a spinning animation when something is loading
 * Think of it like a "please wait" sign that spins to show something is happening
 */

'use client';

const LoadingSpinner = ({ 
  size = 'medium',     // How big the spinner should be
  className = '',      // Extra styling classes
  text = '',          // Optional text to show below spinner
  color = 'orange'    // Color theme for the spinner
}) => {
  
  // Choose size based on the size prop
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4';
      case 'large':
        return 'w-12 h-12';
      case 'xlarge':
        return 'w-16 h-16';
      default: // medium
        return 'w-8 h-8';
    }
  };
  
  // Choose color based on the color prop
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'border-blue-200 border-t-blue-600';
      case 'green':
        return 'border-green-200 border-t-green-600';
      case 'red':
        return 'border-red-200 border-t-red-600';
      case 'purple':
        return 'border-purple-200 border-t-purple-600';
      default: // orange
        return 'border-gray-200 border-t-orange-400';
    }
  };
  
  // Choose text size based on spinner size
  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 'text-xs';
      case 'large':
        return 'text-lg';
      case 'xlarge':
        return 'text-xl';
      default:
        return 'text-sm';
    }
  };
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Spinning circle */}
      <div 
        className={`animate-spin rounded-full border-2 ${getSizeClasses()} ${getColorClasses()}`}
        role="status"
        aria-label="Loading"
      >
        {/* Screen reader text for accessibility */}
        <span className="sr-only">Loading...</span>
      </div>
      
      {/* Optional loading text */}
      {text && (
        <p className={`mt-2 text-gray-600 dark:text-gray-400 ${getTextSize()}`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;