/**
 * Order Success Page
 * This shows confirmation after successful order placement
 */

'use client';

import { useTranslation } from 'react-i18next';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

const OrderSuccessPage = () => {
  const { t } = useTranslation();
  
  const orderNumber = 'ORD' + Date.now().toString().slice(-6);
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        
        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
        
        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">#{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-medium">
                {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        {/* Order Timeline */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Order Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle size={16} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Order Confirmed</p>
                <p className="text-sm text-gray-600">Your order has been placed successfully</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <Package size={16} className="text-gray-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-600">Processing</p>
                <p className="text-sm text-gray-500">We're preparing your order</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <Truck size={16} className="text-gray-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-600">Shipped</p>
                <p className="text-sm text-gray-500">Your order is on the way</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <Home size={16} className="text-gray-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-600">Delivered</p>
                <p className="text-sm text-gray-500">Order delivered to your address</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/profile"
            className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Track Your Order
          </a>
          <a
            href="/"
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Continue Shopping
          </a>
        </div>
        
        {/* Contact Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            Need help with your order? Contact us at{' '}
            <a href="mailto:support@sreeranga.com" className="font-medium underline">
              support@sreeranga.com
            </a>{' '}
            or call{' '}
            <a href="tel:+919876543210" className="font-medium underline">
              +91 98765 43210
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;