/**
 * Returns Policy Page
 * This shows the return and refund policy
 */

'use client';

import { useTranslation } from 'react-i18next';
import { RotateCcw, Clock, CheckCircle, XCircle, Package, CreditCard } from 'lucide-react';

const ReturnsPage = () => {
  const { t } = useTranslation();
  
  const returnSteps = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Contact our customer service or use your account dashboard to start the return process.",
      icon: RotateCcw
    },
    {
      step: 2,
      title: "Package Items",
      description: "Pack items in original packaging with all accessories and documentation.",
      icon: Package
    },
    {
      step: 3,
      title: "Schedule Pickup",
      description: "We'll arrange a convenient pickup time or you can drop off at any of our stores.",
      icon: Clock
    },
    {
      step: 4,
      title: "Refund Processing",
      description: "Once we receive and inspect the items, your refund will be processed within 5-7 business days.",
      icon: CreditCard
    }
  ];
  
  const returnableItems = [
    {
      category: "Electronics",
      period: "15 days",
      conditions: "Original packaging, warranty card, all accessories",
      icon: "📱"
    },
    {
      category: "Clothing & Fashion",
      period: "30 days",
      conditions: "Unworn, with tags, original packaging",
      icon: "👕"
    },
    {
      category: "Home & Kitchen",
      period: "30 days",
      conditions: "Unused, original packaging, all parts included",
      icon: "🏠"
    },
    {
      category: "Books & Stationery",
      period: "15 days",
      conditions: "Undamaged, no writing or markings",
      icon: "📚"
    },
    {
      category: "Beauty Products",
      period: "7 days",
      conditions: "Unopened, sealed packaging only",
      icon: "💄"
    },
    {
      category: "Groceries & FMCG",
      period: "Same day",
      conditions: "Defective or damaged items only",
      icon: "🛒"
    }
  ];
  
  const nonReturnableItems = [
    "Perishable goods (fresh produce, dairy, meat)",
    "Personal care items (opened cosmetics, toiletries)",
    "Customized or personalized products",
    "Digital downloads and gift cards",
    "Items damaged by misuse or normal wear",
    "Products without original packaging or tags"
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Refunds Policy</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help with our easy return process.
        </p>
      </div>
      
      {/* Return Process */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Return Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {returnSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Return Periods by Category */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Return Periods by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {returnableItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.category}</h3>
                  <span className="text-green-600 font-medium">{item.period} return window</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{item.conditions}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Return Conditions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* What Can Be Returned */}
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h3 className="text-xl font-bold text-green-800">What Can Be Returned</h3>
          </div>
          <ul className="space-y-2 text-green-700">
            <li>• Items in original condition and packaging</li>
            <li>• Products with all accessories and documentation</li>
            <li>• Unused items with tags attached</li>
            <li>• Defective or damaged products</li>
            <li>• Wrong items delivered</li>
            <li>• Items that don't match description</li>
          </ul>
        </div>
        
        {/* What Cannot Be Returned */}
        <div className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <XCircle className="h-6 w-6 text-red-600" />
            <h3 className="text-xl font-bold text-red-800">What Cannot Be Returned</h3>
          </div>
          <ul className="space-y-2 text-red-700">
            {nonReturnableItems.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Refund Information */}
      <div className="bg-blue-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Refund Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Refund Timeline</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• Credit/Debit Cards: 5-7 business days</li>
              <li>• UPI/Net Banking: 3-5 business days</li>
              <li>• Cash on Delivery: Store credit or bank transfer</li>
              <li>• Gift Cards: Store credit only</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Refund Methods</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• Original payment method (preferred)</li>
              <li>• Store credit for future purchases</li>
              <li>• Bank transfer (for cash payments)</li>
              <li>• Exchange for different product</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Exchange Policy */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Exchange Policy</h2>
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Size/Color Exchange</h3>
              <p className="text-gray-600 mb-4">
                For clothing and footwear, we offer free size or color exchanges within 30 days, subject to availability.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Items must be unworn with tags</li>
                <li>• Original packaging required</li>
                <li>• Subject to stock availability</li>
                <li>• One exchange per item</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Defective Item Exchange</h3>
              <p className="text-gray-600 mb-4">
                Defective items can be exchanged immediately for the same product or a full refund.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Manufacturing defects covered</li>
                <li>• Immediate replacement if available</li>
                <li>• Full refund if replacement unavailable</li>
                <li>• No time limit for defective items</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="bg-gray-50 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help with Returns?</h2>
          <p className="text-gray-600 mb-6">
            Our customer service team is here to help you with any return or refund questions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Customer Service</h3>
              <p className="text-gray-600">returns@sreeranga.com</p>
              <p className="text-gray-600">+91 89712 90721</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Store Returns</h3>
              <p className="text-gray-600">Visit any of our 5 branches</p>
              <p className="text-gray-600">Mon-Sat: 9 AM - 9 PM</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Online Returns</h3>
              <p className="text-gray-600">Manage returns in your account</p>
              <p className="text-gray-600">24/7 online portal</p>
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition-colors">
              Start Return Process
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;