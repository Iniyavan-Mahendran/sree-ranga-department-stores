/**
 * Notification Component
 * This shows popup messages to users (like success, error, warning messages)
 * Think of it like a friendly messenger that tells you what's happening
 */

'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { hideNotification } from '@/store/slices/uiSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.ui);
  
  // Auto-hide notification after 5 seconds (like a message that disappears)
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
      
      // Clean up timer if component unmounts or notification changes
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);
  
  // Don't show anything if there's no notification
  if (!notification) return null;
  
  // Choose icon and colors based on notification type
  const getNotificationStyle = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-50 border-green-200',
          iconColor: 'text-green-600',
          titleColor: 'text-green-800',
          messageColor: 'text-green-700'
        };
      case 'error':
        return {
          icon: XCircle,
          bgColor: 'bg-red-50 border-red-200',
          iconColor: 'text-red-600',
          titleColor: 'text-red-800',
          messageColor: 'text-red-700'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-50 border-yellow-200',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-800',
          messageColor: 'text-yellow-700'
        };
      case 'info':
      default:
        return {
          icon: Info,
          bgColor: 'bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-800',
          messageColor: 'text-blue-700'
        };
    }
  };
  
  const style = getNotificationStyle(notification.type);
  const Icon = style.icon;
  
  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`max-w-sm w-full ${style.bgColor} border rounded-lg shadow-lg p-4`}>
        <div className="flex items-start">
          {/* Icon */}
          <div className="flex-shrink-0">
            <Icon className={`h-5 w-5 ${style.iconColor}`} />
          </div>
          
          {/* Content */}
          <div className="ml-3 w-0 flex-1">
            {notification.title && (
              <p className={`text-sm font-medium ${style.titleColor}`}>
                {notification.title}
              </p>
            )}
            {notification.message && (
              <p className={`text-sm ${style.messageColor} ${notification.title ? 'mt-1' : ''}`}>
                {notification.message}
              </p>
            )}
          </div>
          
          {/* Close button */}
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => dispatch(hideNotification())}
              className={`inline-flex ${style.iconColor} hover:opacity-75 focus:outline-none`}
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;