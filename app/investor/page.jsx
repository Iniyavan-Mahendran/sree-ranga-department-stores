/**
 * Investor Relations Page
 * This shows information for investors and stakeholders
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TrendingUp, DollarSign, Users, Award, Download, Calendar } from 'lucide-react';

const InvestorPage = () => {
  const { t } = useTranslation();
  
  const financialHighlights = [
    {
      title: "Annual Revenue",
      value: "₹50+ Crores",
      growth: "+15%",
      icon: DollarSign
    },
    {
      title: "Store Locations",
      value: "5 Branches",
      growth: "+25%",
      icon: Users
    },
    {
      title: "Customer Base",
      value: "50,000+",
      growth: "+20%",
      icon: TrendingUp
    },
    {
      title: "Years in Business",
      value: "30 Years",
      growth: "Established 1994",
      icon: Award
    }
  ];
  
  const reports = [
    {
      title: "Annual Report 2023",
      description: "Complete financial and operational overview",
      date: "March 2024",
      type: "PDF",
      size: "2.5 MB"
    },
    {
      title: "Q4 2023 Results",
      description: "Quarterly financial results and highlights",
      date: "January 2024",
      type: "PDF",
      size: "1.8 MB"
    },
    {
      title: "Investor Presentation",
      description: "Company overview and growth strategy",
      date: "December 2023",
      type: "PDF",
      size: "3.2 MB"
    }
  ];
  
  const milestones = [
    {
      year: "1994",
      title: "Company Founded",
      description: "Started as a small family business in Dharmapuri"
    },
    {
      year: "2000",
      title: "First Expansion",
      description: "Opened second branch in Pennagaram"
    },
    {
      year: "2010",
      title: "Digital Transformation",
      description: "Implemented modern POS and inventory systems"
    },
    {
      year: "2020",
      title: "E-commerce Launch",
      description: "Launched online platform and delivery services"
    },
    {
      year: "2024",
      title: "30th Anniversary",
      description: "Celebrating three decades of community service"
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Investor Relations</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our financial performance, growth strategy, and investment opportunities in Tamil Nadu's leading department store chain.
        </p>
      </div>
      
      {/* Financial Highlights */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Financial Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {financialHighlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.value}</h3>
                <p className="text-gray-600 mb-2">{item.title}</p>
                <span className="text-green-600 font-medium text-sm">{item.growth}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Investment Proposition */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Why Invest in Sree Ranga?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold mb-2">Market Leadership</h3>
              <p className="text-blue-100">
                Dominant position in Dharmapuri region with strong brand recognition and customer loyalty.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Consistent Growth</h3>
              <p className="text-blue-100">
                30 years of steady growth with expanding market share and increasing profitability.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Future Ready</h3>
              <p className="text-blue-100">
                Digital transformation and e-commerce expansion positioning for future growth.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Company Milestones */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-200"></div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="text-green-600 font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-md z-10"></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Financial Reports */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Financial Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Download className="h-6 w-6 text-red-600" />
                </div>
                <span className="text-sm text-gray-500">{report.type} • {report.size}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
              <p className="text-gray-600 mb-4">{report.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar size={16} />
                  <span>{report.date}</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Contact Investor Relations */}
      <div className="bg-gray-50 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Investor Contact</h2>
          <p className="text-gray-600 mb-6">
            For investor inquiries, financial information, or partnership opportunities, please contact our investor relations team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Investor Relations</h3>
              <p className="text-gray-600">investors@sreeranga.com</p>
              <p className="text-gray-600">+91 89712 90721</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Business Development</h3>
              <p className="text-gray-600">business@sreeranga.com</p>
              <p className="text-gray-600">+91 89712 90721</p>
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition-colors">
              Schedule a Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorPage;