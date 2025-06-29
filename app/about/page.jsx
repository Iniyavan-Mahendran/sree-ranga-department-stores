/**
 * About Us Page
 * This shows information about Sree Ranga Department Stores
 */

'use client';

import { useTranslation } from 'react-i18next';
import { Award, Users, MapPin, Clock, Phone } from 'lucide-react';

const AboutPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">SR</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Sree Ranga Department Stores</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Celebrating 30 years of serving the community with quality products and exceptional service
        </p>
      </div>
      
      {/* Anniversary Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white text-center mb-12">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Award size={48} className="text-yellow-300" />
          <div>
            <h2 className="text-3xl font-bold">30 Years Anniversary</h2>
            <p className="text-green-100">1994 - 2024</p>
          </div>
        </div>
        <p className="text-lg">
          Three decades of trust, quality, and community service
        </p>
      </div>
      
      {/* Our Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Founded in 1994, Sree Ranga Department Stores began as a small family business with a simple mission: 
              to provide quality products at affordable prices to the people of Dharmapuri and surrounding areas.
            </p>
            <p>
              Over the past 30 years, we have grown from a single store to multiple branches across the region, 
              but our commitment to our customers and community has remained unchanged.
            </p>
            <p>
              Today, we are proud to be one of the most trusted retail chains in Tamil Nadu, serving thousands 
              of families with everything from daily groceries to electronics and fashion.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-gray-600 mb-6">
            To be the preferred shopping destination for families by offering quality products, 
            competitive prices, and exceptional customer service.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
          <p className="text-gray-600">
            To expand our reach while maintaining our core values of trust, quality, and community service, 
            making quality products accessible to everyone.
          </p>
        </div>
      </div>
      
      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <Clock size={48} className="mx-auto text-green-600 mb-4" />
          <h3 className="text-3xl font-bold text-gray-900">30+</h3>
          <p className="text-gray-600">Years of Service</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <MapPin size={48} className="mx-auto text-green-600 mb-4" />
          <h3 className="text-3xl font-bold text-gray-900">5</h3>
          <p className="text-gray-600">Store Locations</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <Users size={48} className="mx-auto text-green-600 mb-4" />
          <h3 className="text-3xl font-bold text-gray-900">50,000+</h3>
          <p className="text-gray-600">Happy Customers</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <Award size={48} className="mx-auto text-green-600 mb-4" />
          <h3 className="text-3xl font-bold text-gray-900">10,000+</h3>
          <p className="text-gray-600">Products Available</p>
        </div>
      </div>
      
      {/* Our Branches */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Branches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Branch 1</h3>
            <p className="text-gray-600 mb-2">S.P. Office (Collectorate)</p>
            <p className="text-sm text-gray-500">Opp. Dharmapuri</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Branch 2</h3>
            <p className="text-gray-600 mb-2">Dharmapuri Main Road</p>
            <p className="text-sm text-gray-500">(Bus Stand), Pennagaram</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Branch 3</h3>
            <p className="text-gray-600 mb-2">Chinnasamy Naidu Street</p>
            <p className="text-sm text-gray-500">Dharmapuri</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Branch 4</h3>
            <p className="text-gray-600 mb-2">Bye Pass Road, Palacode</p>
            <p className="text-sm text-gray-500">Mob: 97860 60787</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Branch 5</h3>
            <p className="text-gray-600 mb-2">AR Police Quarters</p>
            <p className="text-sm text-gray-500">Vennampatti</p>
          </div>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="bg-green-50 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6">
          Visit any of our branches or contact us for more information
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex items-center space-x-2">
            <Phone size={20} className="text-green-600" />
            <span className="font-medium">+91 89712 90721</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={20} className="text-green-600" />
            <span className="font-medium">10-A, Nethaji By Pass Road, Dharmapuri - 636701</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;