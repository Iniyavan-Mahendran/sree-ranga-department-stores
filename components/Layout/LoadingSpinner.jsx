/**
 * Loading Spinner Component
 * Reusable loading indicator
 */

'use client';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4';
      case 'large':
        return 'w-12 h-12';
      case 'xlarge':
        return 'w-16 h-16';
      default:
        return 'w-8 h-8';
    }
  };
  
  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-orange-400 ${getSizeClasses()} ${className}`}></div>
  );
};

export default LoadingSpinner;