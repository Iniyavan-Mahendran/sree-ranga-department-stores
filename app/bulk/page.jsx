/**
 * Bulk Orders Page
 * This shows information about bulk ordering and wholesale
 */

'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Package, Users, TrendingDown, Clock, Send, Calculator } from 'lucide-react';

const BulkPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: '',
    products: '',
    quantity: '',
    message: ''
  });
  
  const benefits = [
    {
      title: "Volume Discounts",
      description: "Up to 25% off on bulk orders",
      icon: TrendingDown,
      color: "text-green-600 bg-green-100"
    },
    {
      title: "Priority Delivery",
      description: "Faster processing and delivery",
      icon: Clock,
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: "Dedicated Support",
      description: "Personal account manager",
      icon: Users,
      color: "text-purple-600 bg-purple-100"
    },
    {
      title: "Custom Packaging",
      description: "Tailored packaging solutions",
      icon: Package,
      color: "text-orange-600 bg-orange-100"
    }
  ];
  
  const businessTypes = [
    "Retail Store",
    "Restaurant/Hotel",
    "Office/Corporate",
    "Educational Institution",
    "Healthcare Facility",
    "Event Management",
    "Other"
  ];
  
  const discountTiers = [
    {
      range: "₹10,000 - ₹25,000",
      discount: "5%",
      description: "Small business orders"
    },
    {
      range: "₹25,000 - ₹50,000",
      discount: "10%",
      description: "Medium volume orders"
    },
    {
      range: "₹50,000 - ₹1,00,000",
      discount: "15%",
      description: "Large volume orders"
    },
    {
      range: "₹1,00,000+",
      discount: "20-25%",
      description: "Enterprise orders"
    }
  ];
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your bulk order inquiry! Our team will contact you within 24 hours.');
    setFormData({
      businessName: '',
      contactPerson: '',
      email: '',
      phone: '',
      businessType: '',
      products: '',
      quantity: '',
      message: ''
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Bulk Orders & Wholesale</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Special pricing and services for businesses, institutions, and large quantity orders. Save more when you buy more!
        </p>
      </div>
      
      {/* Benefits */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Bulk Services?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${benefit.color}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Discount Tiers */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Volume Discount Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {discountTiers.map((tier, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{tier.discount}</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">{tier.range}</div>
              <p className="text-gray-600 text-sm">{tier.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-600">
            * Discounts are calculated on the total order value before taxes and shipping
          </p>
        </div>
      </div>
      
      {/* Popular Categories */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Bulk Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-3xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Groceries & FMCG</h3>
            <p className="text-gray-600 mb-4">Rice, dal, oil, spices, cleaning supplies, and daily essentials</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Minimum order: 50kg or ₹5,000</li>
              <li>• Free delivery on orders above ₹10,000</li>
              <li>• Monthly supply contracts available</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-3xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Office Supplies</h3>
            <p className="text-gray-600 mb-4">Stationery, printing paper, office equipment, and supplies</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Minimum order: ₹2,000</li>
              <li>• Quarterly billing options</li>
              <li>• Custom branding available</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-3xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Event Supplies</h3>
            <p className="text-gray-600 mb-4">Party supplies, decorations, catering essentials, and more</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Minimum order: ₹3,000</li>
              <li>• Event planning consultation</li>
              <li>• Same-day delivery available</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bulk Order Form */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center mb-8">
            <Calculator className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Request Bulk Quote</h2>
            <p className="text-gray-600">
              Fill out the form below and our team will provide you with a customized quote within 24 hours.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter your business name"
                />
              </div>
              
              <div>
                <label className="form-label">Contact Person *</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter contact person name"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>
            
            <div>
              <label className="form-label">Business Type *</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">Select business type</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="form-label">Products Needed *</label>
              <input
                type="text"
                name="products"
                value={formData.products}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="e.g., Rice, Dal, Office Supplies, etc."
              />
            </div>
            
            <div>
              <label className="form-label">Estimated Quantity/Value *</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="e.g., 100kg rice, ₹50,000 worth of supplies"
              />
            </div>
            
            <div>
              <label className="form-label">Additional Requirements</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="form-input"
                placeholder="Any specific requirements, delivery timeline, or other details..."
              ></textarea>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="bg-orange-400 hover:bg-orange-500 text-white font-medium py-3 px-8 rounded-md transition-colors flex items-center justify-center space-x-2 mx-auto"
              >
                <Send size={20} />
                <span>Request Quote</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bulk Sales Team</h2>
          <p className="text-gray-600 mb-6">
            Our dedicated bulk sales team is ready to help you with custom pricing and solutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Bulk Sales Manager</h3>
              <p className="text-gray-600">bulk@sreeranga.com</p>
              <p className="text-gray-600">+91 89712 90721</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
              <p className="text-gray-600">Monday - Saturday</p>
              <p className="text-gray-600">9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkPage;