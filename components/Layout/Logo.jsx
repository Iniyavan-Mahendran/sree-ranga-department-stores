/**
 * Logo Component
 * Reusable logo component for the application
 */

'use client';

import { useSelector } from 'react-redux';

const Logo = ({ size = 'medium', showText = true, className = '' }) => {
  const { theme } = useSelector((state) => state.ui);
  
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8 text-sm';
      case 'large':
        return 'w-16 h-16 text-2xl';
      case 'xlarge':
        return 'w-24 h-24 text-4xl';
      default:
        return 'w-10 h-10 text-lg';
    }
  };
  
  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 'text-lg';
      case 'large':
        return 'text-3xl';
      case 'xlarge':
        return 'text-5xl';
      default:
        return 'text-2xl';
    }
  };
  
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center ${getSizeClasses()}`}>
        <span className="text-white font-bold">SR</span>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div>
          <h1 className={`font-bold text-green-600 dark:text-green-400 ${getTextSize()}`}>
            Sree Ranga
          </h1>
          {size !== 'small' && (
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Department Stores
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;