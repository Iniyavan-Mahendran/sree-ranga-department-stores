/**
 * Footer Component
 * This appears at the bottom of every page
 * Contains links, company info, and social media
 */

'use client';

import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SR</span>
              </div>
              <h3 className="text-2xl font-bold text-green-400">Sree Ranga</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted department store for all daily needs. Quality products at affordable prices for over 30 years.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>10-A, Nethaji By Pass Road, Dharmapuri - 636701</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+91 89712 90721</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@sreeranga.com</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-green-400 transition-colors">{t('footer.about_us')}</a></li>
              <li><a href="/contact" className="hover:text-green-400 transition-colors">{t('footer.contact')}</a></li>
              <li><a href="/careers" className="hover:text-green-400 transition-colors">Careers</a></li>
              <li><a href="/investor" className="hover:text-green-400 transition-colors">Investor Relations</a></li>
              <li><a href="/press" className="hover:text-green-400 transition-colors">Press Releases</a></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/help" className="hover:text-green-400 transition-colors">Help Center</a></li>
              <li><a href="/returns" className="hover:text-green-400 transition-colors">Return Policy</a></li>
              <li><a href="/shipping" className="hover:text-green-400 transition-colors">Shipping Info</a></li>
              <li><a href="/track" className="hover:text-green-400 transition-colors">Track Your Order</a></li>
              <li><a href="/bulk" className="hover:text-green-400 transition-colors">Bulk Orders</a></li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.follow_us')}</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-green-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                <Youtube size={24} />
              </a>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-black rounded-l-md focus:outline-none"
              />
              <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-300 mb-4 md:mb-0">
              © 2024 Sree Ranga Department Stores. All rights reserved. | Celebrating 30 Years of Excellence
            </div>
            <div className="flex space-x-4 text-sm">
              <a href="/privacy" className="hover:text-green-400 transition-colors">
                {t('footer.privacy_policy')}
              </a>
              <a href="/terms" className="hover:text-green-400 transition-colors">
                {t('footer.terms_conditions')}
              </a>
              <a href="/cookies" className="hover:text-green-400 transition-colors">
                Cookies Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;