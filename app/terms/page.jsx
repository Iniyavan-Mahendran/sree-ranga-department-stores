/**
 * Terms and Conditions Page
 * This shows the terms and conditions for using the website
 */

'use client';

import { useTranslation } from 'react-i18next';

const TermsPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-gray-600">Last updated: January 2024</p>
        </div>
        
        {/* Content */}
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using the Sree Ranga Department Stores website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily download one copy of the materials on Sree Ranga Department Stores' website for personal, non-commercial transitory viewing only.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>This is the grant of a license, not a transfer of title</li>
              <li>Under this license you may not modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Product Information</h2>
            <p className="text-gray-600 mb-4">
              We strive to provide accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pricing and Payment</h2>
            <p className="text-gray-600 mb-4">
              All prices are subject to change without notice. We reserve the right to modify or discontinue products at any time.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Prices include applicable taxes unless otherwise stated</li>
              <li>Payment must be made at the time of purchase</li>
              <li>We accept various payment methods as displayed during checkout</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Shipping and Delivery</h2>
            <p className="text-gray-600 mb-4">
              We will make every effort to deliver products within the estimated timeframe, but delivery times are not guaranteed.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Returns and Refunds</h2>
            <p className="text-gray-600 mb-4">
              We offer a 30-day return policy for most items. Products must be returned in original condition with all packaging and accessories.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              In no event shall Sree Ranga Department Stores be liable for any damages arising out of the use or inability to use the materials on the website.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
            <p className="text-gray-600 mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Tamil Nadu.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">
                <strong>Sree Ranga Department Stores</strong><br />
                10-A, Nethaji By Pass Road<br />
                Dharmapuri - 636701, Tamil Nadu, India<br />
                Phone: +91 89712 90721<br />
                Email: info@sreeranga.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;