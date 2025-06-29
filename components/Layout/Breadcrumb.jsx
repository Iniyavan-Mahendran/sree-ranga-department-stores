/**
 * Breadcrumb Component
 * Shows navigation path
 */

'use client';

import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <a href="/" className="flex items-center hover:text-orange-600 transition-colors">
        <Home size={16} />
      </a>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight size={16} className="text-gray-400" />
          {item.href ? (
            <a
              href={item.href}
              className="hover:text-orange-600 transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;