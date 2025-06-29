/**
 * Help Center Page
 * This shows frequently asked questions and help topics
 */

'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, Search, Phone, Mail, MessageCircle } from 'lucide-react';

const HelpPage = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqs = [
    {
      id: 1,
      question: "How do I place an order?",
      answer: "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. You'll need to provide shipping information and payment details to complete your order."
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, UPI, net banking, and cash on delivery for eligible orders."
    },
    {
      id: 3,
      question: "How long does delivery take?",
      answer: "Delivery typically takes 2-5 business days depending on your location. We offer free delivery on orders above ₹499."
    },
    {
      id: 4,
      question: "Can I return or exchange items?",
      answer: "Yes, we offer a 30-day return policy for most items. Products must be in original condition with all packaging and accessories."
    },
    {
      id: 5,
      question: "How do I track my order?",
      answer: "You can track your order by logging into your account and viewing your order history. You'll also receive tracking information via email and SMS."
    },
    {
      id: 6,
      question: "Do you offer bulk discounts?",
      answer: "Yes, we offer special pricing for bulk orders. Please contact our customer service team for more information about bulk pricing."
    },
    {
      id: 7,
      question: "Are your products genuine?",
      answer: "Yes, all our products are 100% genuine and sourced directly from authorized distributors and manufacturers."
    },
    {
      id: 8,
      question: "How do I cancel my order?",
      answer: "You can cancel your order within 24 hours of placing it by contacting our customer service team or through your account dashboard."
    }
  ];
  
  const helpTopics = [
    {
      title: "Orders & Shipping",
      description: "Information about placing orders, shipping, and delivery",
      icon: "📦"
    },
    {
      title: "Returns & Refunds",
      description: "How to return items and get refunds",
      icon: "↩️"
    },
    {
      title: "Account & Profile",
      description: "Managing your account and personal information",
      icon: "👤"
    },
    {
      title: "Payment & Billing",
      description: "Payment methods, billing, and invoices",
      icon: "💳"
    },
    {
      title: "Product Information",
      description: "Details about our products and availability",
      icon: "ℹ️"
    },
    {
      title: "Technical Support",
      description: "Website issues and technical problems",
      icon: "🔧"
    }
  ];
  
  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };
  
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-xl text-gray-600">
          Find answers to your questions or get in touch with our support team
        </p>
      </div>
      
      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>
      
      {/* Help Topics */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse Help Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpTopics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">{topic.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
              <p className="text-gray-600 text-sm">{topic.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* FAQs */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-sm border">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50"
              >
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                {openFaq === faq.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openFaq === faq.id && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {filteredFaqs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No FAQs found matching your search.</p>
          </div>
        )}
      </div>
      
      {/* Contact Support */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Still Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak with our customer service team</p>
            <p className="font-medium text-blue-600">+91 89712 90721</p>
            <p className="text-sm text-gray-500">Mon-Sat: 9 AM - 9 PM</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Send us your questions anytime</p>
            <p className="font-medium text-green-600">support@sreeranga.com</p>
            <p className="text-sm text-gray-500">Response within 24 hours</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with our support team</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors">
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;