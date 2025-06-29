/**
 * User Profile Page
 * This shows user account information and order history
 */

'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { User, Mail, Phone, MapPin, Package, Settings, LogOut } from 'lucide-react';
import { logout } from '@/store/slices/authSlice';
import { showNotification } from '@/store/slices/uiSlice';

const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock order data
  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 1250,
      items: 3
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      status: 'In Transit',
      total: 890,
      items: 2
    },
    {
      id: 'ORD003',
      date: '2024-01-05',
      status: 'Processing',
      total: 2100,
      items: 5
    }
  ];
  
  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    dispatch(showNotification({
      type: 'success',
      title: 'Logged Out',
      message: 'You have been successfully logged out'
    }));
    window.location.href = '/';
  };
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <User size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Please Sign In</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your profile.
          </p>
          <a
            href="/auth/login"
            className="inline-block bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-orange-400 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Full Name</label>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                      <User size={20} className="text-gray-400" />
                      <span>{user?.name}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="form-label">Email Address</label>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                      <Mail size={20} className="text-gray-400" />
                      <span>{user?.email}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="form-label">Phone Number</label>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                      <Phone size={20} className="text-gray-400" />
                      <span>{user?.phone || 'Not provided'}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="form-label">Address</label>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                      <MapPin size={20} className="text-gray-400" />
                      <span>Not provided</span>
                    </div>
                  </div>
                </div>
                
                <button className="btn-primary">
                  Edit Profile
                </button>
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Order History</h2>
                
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">Placed on {order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          {order.items} items • ₹{order.total.toLocaleString()}
                        </p>
                        <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive updates about your orders</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-orange-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">Get SMS updates for deliveries</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 text-orange-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                      <p className="text-sm text-gray-600">Receive promotional offers</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-orange-600" />
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <button className="text-red-600 hover:text-red-700 font-medium">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;