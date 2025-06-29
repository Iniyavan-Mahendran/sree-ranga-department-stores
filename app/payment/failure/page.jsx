/**
 * Payment Failure Page
 * This page shows when payment fails
 * Like when your card gets declined at the store
 */

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { XCircle, RefreshCw, CreditCard, Phone, AlertTriangle } from 'lucide-react';

const PaymentFailurePage = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [failureDetails, setFailureDetails] = useState(null);
  
  // Get failure information from URL parameters
  useEffect(() => {
    const reason = searchParams.get('reason') || 'payment_declined';
    const orderId = searchParams.get('orderId') || 'ORD' + Date.now().toString().slice(-6);
    const amount = searchParams.get('amount') || '1250';
    
    setFailureDetails({
      reason,
      orderId,
      amount: parseFloat(amount),
      timestamp: new Date().toISOString()
    });
  }, [searchParams]);
  
  // Different failure reasons and their messages
  const getFailureMessage = (reason) => {
    switch (reason) {
      case 'insufficient_funds':
        return {
          title: 'Insufficient Funds',
          message: 'Your account does not have enough balance to complete this transaction.',
          icon: CreditCard,
          color: 'text-red-600'
        };
      case 'card_declined':
        return {
          title: 'Card Declined',
          message: 'Your card was declined by the bank. Please try a different payment method.',
          icon: XCircle,
          color: 'text-red-600'
        };
      case 'expired_card':
        return {
          title: 'Card Expired',
          message: 'Your card has expired. Please use a different card or update your card details.',
          icon: CreditCard,
          color: 'text-orange-600'
        };
      case 'network_error':
        return {
          title: 'Network Error',
          message: 'There was a network issue during payment processing. Please try again.',
          icon: AlertTriangle,
          color: 'text-yellow-600'
        };
      default:
        return {
          title: 'Payment Failed',
          message: 'Your payment could not be processed. Please try again or contact support.',
          icon: XCircle,
          color: 'text-red-600'
        };
    }
  };
  
  if (!failureDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  const failureInfo = getFailureMessage(failureDetails.reason);
  const FailureIcon = failureInfo.icon;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Failure Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FailureIcon size={48} className={failureInfo.color} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {failureInfo.title}
            </h1>
            <p className="text-gray-600">
              {failureInfo.message}
            </p>
          </div>
          
          {/* Failure Details Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Transaction Details</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">#{failureDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">₹{failureDetails.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Failure Reason:</span>
                <span className="font-medium text-red-600 capitalize">
                  {failureDetails.reason.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{new Date(failureDetails.timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* Troubleshooting Tips */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">What you can do:</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">1</span>
                </div>
                <p className="text-gray-600">Check your card details and try again</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">2</span>
                </div>
                <p className="text-gray-600">Try a different payment method (UPI, Net Banking, etc.)</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">3</span>
                </div>
                <p className="text-gray-600">Contact your bank if the issue persists</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">4</span>
                </div>
                <p className="text-gray-600">Reach out to our customer support for assistance</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2 bg-orange-400 hover:bg-orange-500 text-white py-3 px-4 rounded-md transition-colors"
            >
              <RefreshCw size={20} />
              <span>Try Again</span>
            </button>
            
            <a
              href="/help"
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors"
            >
              <Phone size={20} />
              <span>Contact Support</span>
            </a>
          </div>
          
          {/* Continue Shopping */}
          <div className="text-center">
            <a
              href="/"
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              Continue Shopping
            </a>
          </div>
          
          {/* Support Info */}
          <div className="mt-8 p-4 bg-red-50 rounded-lg text-center">
            <p className="text-sm text-red-800">
              If you continue to experience issues, please contact our support team at{' '}
              <a href="mailto:support@sreeranga.com" className="font-medium underline">
                support@sreeranga.com
              </a>{' '}
              or call{' '}
              <a href="tel:+918971290721" className="font-medium underline">
                +91 89712 90721
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailurePage;