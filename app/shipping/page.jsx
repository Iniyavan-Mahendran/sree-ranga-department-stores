/**
 * Shipping Information Page
 * This shows shipping policies and delivery information
 */

'use client';

import { useTranslation } from 'react-i18next';
import { Truck, Clock, MapPin, Package, Shield, CreditCard } from 'lucide-react';

const ShippingPage = () => {
  const { t } = useTranslation();
  
  const shippingOptions = [
    {
      name: "Standard Delivery",
      time: "3-5 business days",
      cost: "₹50",
      description: "Regular delivery to your doorstep",
      icon: Truck
    },
    {
      name: "Express Delivery",
      time: "1-2 business days",
      cost: "₹100",
      description: "Faster delivery for urgent orders",
      icon: Clock
    },
    {
      name: "Same Day Delivery",
      time: "Within 24 hours",
      cost: "₹150",
      description: "Available in Dharmapuri city limits",
      icon: Package
    },
    {
      name: "Free Delivery",
      time: "3-5 business days",
      cost: "FREE",
      description: "On orders above ₹499",
      icon: Shield
    }
  ];
  
  const deliveryZones = [
    {
      zone: "Zone 1 - Local",
      areas: ["Dharmapuri City", "Pennagaram", "Palacode"],
      time: "1-2 days",
      cost: "₹30"
    },
    {
      zone: "Zone 2 - Regional",
      areas: ["Salem", "Krishnagiri", "Hosur", "Tiruvannamalai"],
      time: "2-3 days",
      cost: "₹50"
    },
    {
      zone: "Zone 3 - State",
      areas: ["Chennai", "Coimbatore", "Madurai", "Trichy"],
      time: "3-5 days",
      cost: "₹75"
    },
    {
      zone: "Zone 4 - National",
      areas: ["Other Indian Cities"],
      time: "5-7 days",
      cost: "₹100"
    }
  ];
  
  const packagingInfo = [
    {
      title: "Secure Packaging",
      description: "All items are carefully packed to prevent damage during transit",
      icon: "📦"
    },
    {
      title: "Eco-Friendly Materials",
      description: "We use recyclable and biodegradable packaging materials",
      icon: "🌱"
    },
    {
      title: "Temperature Control",
      description: "Special packaging for perishable and temperature-sensitive items",
      icon: "❄️"
    },
    {
      title: "Fragile Item Care",
      description: "Extra protection for electronics and breakable items",
      icon: "🛡️"
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We deliver across Tamil Nadu and India with multiple shipping options to suit your needs. Fast, reliable, and secure delivery guaranteed.
        </p>
      </div>
      
      {/* Shipping Options */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shipping Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shippingOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.name}</h3>
                <div className="text-2xl font-bold text-green-600 mb-2">{option.cost}</div>
                <div className="text-sm text-gray-600 mb-3">{option.time}</div>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Delivery Zones */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Delivery Zones & Charges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliveryZones.map((zone, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{zone.zone}</h3>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{zone.cost}</div>
                  <div className="text-sm text-gray-600">{zone.time}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {zone.areas.map((area, areaIndex) => (
                  <span key={areaIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Free Shipping Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">🚚 FREE SHIPPING</h2>
          <p className="text-xl mb-4">On all orders above ₹499</p>
          <p className="text-green-100">
            Shop more, save more! Add items to your cart to qualify for free delivery across Tamil Nadu.
          </p>
        </div>
      </div>
      
      {/* Packaging Information */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Packaging Promise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packagingInfo.map((info, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{info.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-gray-600 text-sm">{info.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Shipping Process */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Shipping Works</h2>
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Placed</h3>
              <p className="text-gray-600 text-sm">Your order is confirmed and payment is processed</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Packed</h3>
              <p className="text-gray-600 text-sm">Items are carefully packed and prepared for shipping</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">In Transit</h3>
              <p className="text-gray-600 text-sm">Package is shipped and tracking information is provided</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Delivered</h3>
              <p className="text-gray-600 text-sm">Package arrives at your doorstep safely</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Special Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Cash on Delivery</h3>
          <p className="text-blue-800 mb-4">
            Pay when you receive your order. Available for orders up to ₹5,000.
          </p>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• Additional ₹25 COD charges apply</li>
            <li>• Available in select areas</li>
            <li>• Exact change appreciated</li>
            <li>• ID verification required</li>
          </ul>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-purple-900 mb-4">Installation Service</h3>
          <p className="text-purple-800 mb-4">
            Professional installation available for electronics and appliances.
          </p>
          <ul className="space-y-2 text-purple-700 text-sm">
            <li>• Trained technicians</li>
            <li>• Same-day installation</li>
            <li>• Additional charges apply</li>
            <li>• 1-year service warranty</li>
          </ul>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="bg-gray-50 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Support</h2>
          <p className="text-gray-600 mb-6">
            Have questions about shipping or need to track your order? We're here to help!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-2">Track Your Order</h3>
              <p className="text-gray-600 text-sm">Real-time tracking updates</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-2">Delivery Support</h3>
              <p className="text-gray-600 text-sm">+91 89712 90721</p>
            </div>
            <div className="text-center">
              <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-2">Shipping Queries</h3>
              <p className="text-gray-600 text-sm">shipping@sreeranga.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;