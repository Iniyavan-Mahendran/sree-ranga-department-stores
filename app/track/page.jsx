/**
 * Order Tracking Page
 * This allows users to track their orders
 */

'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

const TrackPage = () => {
  const { t } = useTranslation();
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Mock tracking data
  const mockTrackingData = {
    'ORD123456': {
      orderId: 'ORD123456',
      status: 'In Transit',
      estimatedDelivery: '2024-01-20',
      currentLocation: 'Dharmapuri Distribution Center',
      items: [
        { name: 'Basmati Rice - 5kg', quantity: 1, image: 'https://images.pexels.com/photos/33783/rice-Vietnamese-food-grain.jpg?auto=compress&cs=tinysrgb&w=100' },
        { name: 'Toor Dal - 1kg', quantity: 2, image: 'https://images.pexels.com/photos/4198751/pexels-photo-4198751.jpeg?auto=compress&cs=tinysrgb&w=100' }
      ],
      timeline: [
        {
          status: 'Order Placed',
          date: '2024-01-15',
          time: '10:30 AM',
          location: 'Sree Ranga Store',
          completed: true,
          icon: CheckCircle
        },
        {
          status: 'Order Confirmed',
          date: '2024-01-15',
          time: '11:00 AM',
          location: 'Sree Ranga Store',
          completed: true,
          icon: CheckCircle
        },
        {
          status: 'Packed',
          date: '2024-01-16',
          time: '09:15 AM',
          location: 'Dharmapuri Warehouse',
          completed: true,
          icon: Package
        },
        {
          status: 'In Transit',
          date: '2024-01-17',
          time: '02:30 PM',
          location: 'Dharmapuri Distribution Center',
          completed: true,
          icon: Truck,
          current: true
        },
        {
          status: 'Out for Delivery',
          date: '2024-01-20',
          time: 'Expected',
          location: 'Local Delivery Hub',
          completed: false,
          icon: Truck
        },
        {
          status: 'Delivered',
          date: '2024-01-20',
          time: 'Expected',
          location: 'Your Address',
          completed: false,
          icon: CheckCircle
        }
      ]
    },
    'ORD789012': {
      orderId: 'ORD789012',
      status: 'Delivered',
      estimatedDelivery: '2024-01-18',
      currentLocation: 'Delivered',
      items: [
        { name: 'Samsung Galaxy Smartphone', quantity: 1, image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=100' }
      ],
      timeline: [
        {
          status: 'Order Placed',
          date: '2024-01-15',
          time: '02:15 PM',
          location: 'Sree Ranga Store',
          completed: true,
          icon: CheckCircle
        },
        {
          status: 'Order Confirmed',
          date: '2024-01-15',
          time: '02:30 PM',
          location: 'Sree Ranga Store',
          completed: true,
          icon: CheckCircle
        },
        {
          status: 'Packed',
          date: '2024-01-16',
          time: '10:00 AM',
          location: 'Dharmapuri Warehouse',
          completed: true,
          icon: Package
        },
        {
          status: 'In Transit',
          date: '2024-01-17',
          time: '08:00 AM',
          location: 'Dharmapuri Distribution Center',
          completed: true,
          icon: Truck
        },
        {
          status: 'Out for Delivery',
          date: '2024-01-18',
          time: '09:00 AM',
          location: 'Local Delivery Hub',
          completed: true,
          icon: Truck
        },
        {
          status: 'Delivered',
          date: '2024-01-18',
          time: '03:45 PM',
          location: 'Your Address',
          completed: true,
          icon: CheckCircle,
          current: true
        }
      ]
    }
  };
  
  const handleTrack = async () => {
    if (!trackingId.trim()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = mockTrackingData[trackingId.toUpperCase()];
      setTrackingResult(result || null);
      setLoading(false);
    }, 1000);
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 bg-green-100';
      case 'In Transit':
      case 'Out for Delivery':
        return 'text-blue-600 bg-blue-100';
      case 'Packed':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Enter your order ID or tracking number to get real-time updates on your delivery status.
        </p>
      </div>
      
      {/* Tracking Form */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter Order ID (e.g., ORD123456)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              />
            </div>
            <button
              onClick={handleTrack}
              disabled={loading || !trackingId.trim()}
              className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Search size={20} />
              <span>{loading ? 'Tracking...' : 'Track Order'}</span>
            </button>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Demo Order IDs: ORD123456 (In Transit), ORD789012 (Delivered)</p>
          </div>
        </div>
      </div>
      
      {/* Tracking Results */}
      {trackingResult && (
        <div className="max-w-4xl mx-auto">
          
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Order #{trackingResult.orderId}</h2>
                <p className="text-gray-600">Current Status: 
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trackingResult.status)}`}>
                    {trackingResult.status}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Estimated Delivery</p>
                <p className="text-lg font-semibold text-gray-900">{trackingResult.estimatedDelivery}</p>
              </div>
            </div>
            
            {/* Current Location */}
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="h-5 w-5 text-orange-400" />
              <span className="text-gray-600">Current Location: </span>
              <span className="font-medium text-gray-900">{trackingResult.currentLocation}</span>
            </div>
            
            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Items in this order</h3>
              <div className="space-y-3">
                {trackingResult.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tracking Timeline */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Tracking Timeline</h3>
            <div className="space-y-6">
              {trackingResult.timeline.map((event, index) => {
                const Icon = event.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      event.completed 
                        ? event.current 
                          ? 'bg-orange-400 text-white' 
                          : 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold ${
                          event.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {event.status}
                        </h4>
                        <div className="text-right">
                          <p className={`text-sm ${
                            event.completed ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {event.date}
                          </p>
                          <p className={`text-sm ${
                            event.completed ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {event.time}
                          </p>
                        </div>
                      </div>
                      <p className={`text-sm ${
                        event.completed ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {event.location}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* No Results */}
      {trackingResult === null && trackingId && !loading && (
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">Order Not Found</h3>
            <p className="text-red-600 mb-4">
              We couldn't find an order with ID "{trackingId}". Please check your order ID and try again.
            </p>
            <p className="text-sm text-red-500">
              Order IDs are usually sent via email or SMS when you place an order.
            </p>
          </div>
        </div>
      )}
      
      {/* Help Section */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Delivery Support</h3>
              <p className="text-gray-600 text-sm">Call us for delivery updates</p>
              <p className="text-blue-600 font-medium">+91 89712 90721</p>
            </div>
            <div className="text-center">
              <Package className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Order Issues</h3>
              <p className="text-gray-600 text-sm">Report problems with your order</p>
              <p className="text-green-600 font-medium">orders@sreeranga.com</p>
            </div>
            <div className="text-center">
              <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Store Pickup</h3>
              <p className="text-gray-600 text-sm">Collect from any of our 5 branches</p>
              <p className="text-purple-600 font-medium">Mon-Sat: 9 AM - 9 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackPage;