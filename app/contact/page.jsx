/**
 * Contact Us Page
 * This shows contact information and contact form
 */

'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          We're here to help! Get in touch with us for any questions or support.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          
          <div className="space-y-6">
            
            {/* Main Office */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Main Office</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin size={20} className="text-green-600 mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">10-A, Nethaji By Pass Road, Dharmapuri - 636701, Tamil Nadu, India</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone size={20} className="text-green-600" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+91 89712 90721</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-green-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">info@sreeranga.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock size={20} className="text-green-600 mt-1" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 9:00 PM<br />
                      Sunday: 10:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Branch Locations */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Branches</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Branch 1: S.P. Office (Collectorate)</p>
                  <p className="text-gray-600">Opp. Dharmapuri</p>
                </div>
                <div>
                  <p className="font-medium">Branch 2: Dharmapuri Main Road</p>
                  <p className="text-gray-600">(Bus Stand), Pennagaram</p>
                </div>
                <div>
                  <p className="font-medium">Branch 3: Chinnasamy Naidu Street</p>
                  <p className="text-gray-600">Dharmapuri</p>
                </div>
                <div>
                  <p className="font-medium">Branch 4: Bye Pass Road, Palacode</p>
                  <p className="text-gray-600">Mob: 97860 60787</p>
                </div>
                <div>
                  <p className="font-medium">Branch 5: AR Police Quarters</p>
                  <p className="text-gray-600">Vennampatti</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="space-y-4">
              
              <div>
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="+91 9876543210"
                />
              </div>
              
              <div>
                <label className="form-label">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="complaint">Complaint</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="bulk">Bulk Orders</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              
              <div>
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-input"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </div>
          </form>
          
          {/* Additional Info */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold text-green-800 mb-2">Quick Response Guarantee</h3>
            <p className="text-sm text-green-700">
              We typically respond to all inquiries within 24 hours during business days. 
              For urgent matters, please call us directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;