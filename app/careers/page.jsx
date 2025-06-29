/**
 * Careers Page
 * This shows job opportunities at Sree Ranga Department Stores
 */

'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, Users, Send } from 'lucide-react';

const CareersPage = () => {
  const { t } = useTranslation();
  
  const [selectedJob, setSelectedJob] = useState(null);
  
  const jobOpenings = [
    {
      id: 1,
      title: "Store Manager",
      department: "Retail Operations",
      location: "Dharmapuri",
      type: "Full-time",
      experience: "3-5 years",
      description: "Lead and manage daily store operations, supervise staff, and ensure excellent customer service.",
      requirements: [
        "Bachelor's degree in Business or related field",
        "3+ years of retail management experience",
        "Strong leadership and communication skills",
        "Knowledge of Tamil and English"
      ]
    },
    {
      id: 2,
      title: "Sales Associate",
      department: "Customer Service",
      location: "Multiple Locations",
      type: "Full-time",
      experience: "0-2 years",
      description: "Assist customers with product selection, handle transactions, and maintain store presentation.",
      requirements: [
        "High school diploma or equivalent",
        "Customer service experience preferred",
        "Good communication skills",
        "Ability to work flexible hours"
      ]
    },
    {
      id: 3,
      title: "Inventory Coordinator",
      department: "Supply Chain",
      location: "Dharmapuri",
      type: "Full-time",
      experience: "2-4 years",
      description: "Manage inventory levels, coordinate with suppliers, and ensure product availability.",
      requirements: [
        "Bachelor's degree preferred",
        "Experience in inventory management",
        "Proficiency in MS Office",
        "Attention to detail"
      ]
    },
    {
      id: 4,
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Dharmapuri",
      type: "Full-time",
      experience: "2-3 years",
      description: "Develop and execute digital marketing campaigns, manage social media, and analyze performance.",
      requirements: [
        "Bachelor's degree in Marketing or related field",
        "Experience with digital marketing tools",
        "Knowledge of SEO and social media",
        "Creative thinking and analytical skills"
      ]
    }
  ];
  
  const benefits = [
    {
      title: "Competitive Salary",
      description: "We offer competitive compensation packages",
      icon: "💰"
    },
    {
      title: "Health Insurance",
      description: "Comprehensive health coverage for you and your family",
      icon: "🏥"
    },
    {
      title: "Career Growth",
      description: "Opportunities for advancement and skill development",
      icon: "📈"
    },
    {
      title: "Work-Life Balance",
      description: "Flexible schedules and paid time off",
      icon: "⚖️"
    },
    {
      title: "Employee Discounts",
      description: "Special discounts on all store products",
      icon: "🛍️"
    },
    {
      title: "Training Programs",
      description: "Continuous learning and development opportunities",
      icon: "🎓"
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Be part of our 30-year legacy of serving the community. We're looking for passionate individuals to help us grow and serve our customers better.
        </p>
      </div>
      
      {/* Company Culture */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
          <p className="text-lg mb-6">
            At Sree Ranga, we believe our employees are our greatest asset. Join a company that values growth, integrity, and community service.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="font-semibold">30 Years of Excellence</h3>
              <p className="text-sm text-green-100">Established reputation in the community</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">👥</div>
              <h3 className="font-semibold">Great Team</h3>
              <p className="text-sm text-green-100">Work with passionate professionals</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🌱</div>
              <h3 className="font-semibold">Growth Opportunities</h3>
              <p className="text-sm text-green-100">Advance your career with us</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Employee Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Job Openings */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Current Openings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobOpenings.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-gray-600">{job.department}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {job.type}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin size={16} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span>{job.experience}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{job.description}</p>
              
              <button
                onClick={() => setSelectedJob(job)}
                className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded-md transition-colors"
              >
                View Details & Apply
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Application Form Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h3>
                  <p className="text-gray-600">{selectedJob.department} • {selectedJob.location}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
                <p className="text-gray-600 mb-4">{selectedJob.description}</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input type="text" required className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Email *</label>
                    <input type="email" required className="form-input" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input type="tel" required className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Experience (Years)</label>
                    <input type="number" className="form-input" />
                  </div>
                </div>
                
                <div>
                  <label className="form-label">Cover Letter</label>
                  <textarea rows={4} className="form-input" placeholder="Tell us why you're interested in this position..."></textarea>
                </div>
                
                <div>
                  <label className="form-label">Resume *</label>
                  <input type="file" accept=".pdf,.doc,.docx" required className="form-input" />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send size={20} />
                    <span>Submit Application</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Contact HR */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Don't See the Right Position?</h2>
        <p className="text-gray-600 mb-6">
          We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <div className="flex items-center space-x-2">
            <Users size={20} className="text-green-600" />
            <span className="font-medium">HR Department: hr@sreeranga.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={20} className="text-green-600" />
            <span className="font-medium">Mon-Fri: 9 AM - 6 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;