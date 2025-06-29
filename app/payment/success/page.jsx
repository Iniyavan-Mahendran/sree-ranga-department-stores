/**
 * Payment Success Page
 * This page shows when payment is completed successfully
 * Like getting a receipt after buying something
 */

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Package, Truck, Home, Download, Share2 } from 'lucide-react';

const PaymentSuccessPage = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  
  // Get order information from URL parameters
  useEffect(() => {
    const orderId = searchParams.get('orderId') || 'ORD' + Date.now().toString().slice(-6);
    const amount = searchParams.get('amount') || '1250';
    
    // Simulate order details (in real app, fetch from API)
    setOrderDetails({
      orderId,
      amount: parseFloat(amount),
      paymentMethod: searchParams.get('method') || 'card',
      date: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    });
  }, [searchParams]);
  
  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              Your order has been confirmed and will be processed shortly.
            </p>
          </div>
          
          {/* Order Summary Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">#{orderDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-medium text-green-600">₹{orderDetails.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium capitalize">{orderDetails.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">{new Date(orderDetails.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-medium">{new Date(orderDetails.estimatedDelivery).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          {/* Order Timeline */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Payment Confirmed</p>
                  <p className="text-sm text-gray-600">Your payment has been processed successfully</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Package size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Processing</p>
                  <p className="text-sm text-gray-600">We're preparing your order for shipment</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Truck size={16} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-600">Shipped</p>
                  <p className="text-sm text-gray-500">Your order will be shipped soon</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Home size={16} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-600">Delivered</p>
                  <p className="text-sm text-gray-500">Estimated delivery date</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md transition-colors">
              <Download size={20} />
              <span>Download Receipt</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors">
              <Package size={20} />
              <span>Track Order</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-md transition-colors">
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>
          
          {/* Continue Shopping */}
          <div className="text-center">
            <a
              href="/"
              className="inline-block bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              Continue Shopping
            </a>
          </div>
          
          {/* Support Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-sm text-blue-800">
              Need help with your order? Contact us at{' '}
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

export default PaymentSuccessPage;