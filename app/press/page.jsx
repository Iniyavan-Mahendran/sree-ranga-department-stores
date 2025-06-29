/**
 * Press Releases Page
 * This shows company news and press releases
 */

'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Download, ExternalLink, Search } from 'lucide-react';

const PressPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const pressReleases = [
    {
      id: 1,
      title: "Sree Ranga Department Stores Celebrates 30 Years of Excellence",
      date: "2024-01-15",
      category: "milestone",
      excerpt: "Marking three decades of serving the Dharmapuri community with quality products and exceptional service.",
      content: "Sree Ranga Department Stores proudly celebrates its 30th anniversary, marking three decades of unwavering commitment to serving the Dharmapuri community...",
      image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      id: 2,
      title: "New E-commerce Platform Launched for Enhanced Customer Experience",
      date: "2024-01-10",
      category: "technology",
      excerpt: "Introducing online shopping with home delivery services across Tamil Nadu.",
      content: "We are excited to announce the launch of our new e-commerce platform, bringing the convenience of online shopping to our valued customers...",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      id: 3,
      title: "Expansion to Fifth Branch in Vennampatti",
      date: "2023-12-20",
      category: "expansion",
      excerpt: "Opening new location to better serve customers in the AR Police Quarters area.",
      content: "Sree Ranga Department Stores continues its expansion with the opening of our fifth branch in Vennampatti...",
      image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      id: 4,
      title: "Partnership with Local Farmers for Fresh Produce",
      date: "2023-11-15",
      category: "partnership",
      excerpt: "Supporting local agriculture while providing customers with the freshest products.",
      content: "We are proud to announce our new partnership with local farmers in the Dharmapuri region...",
      image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      id: 5,
      title: "Community Service Initiative: Supporting Local Education",
      date: "2023-10-05",
      category: "community",
      excerpt: "Donating school supplies and supporting educational programs in rural areas.",
      content: "As part of our commitment to community development, Sree Ranga Department Stores has launched an education support initiative...",
      image: "https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=500"
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'milestone', name: 'Milestones' },
    { id: 'technology', name: 'Technology' },
    { id: 'expansion', name: 'Expansion' },
    { id: 'partnership', name: 'Partnerships' },
    { id: 'community', name: 'Community' }
  ];
  
  const filteredReleases = pressReleases.filter(release => {
    const matchesSearch = release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         release.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || release.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Press Releases</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest news, announcements, and developments from Sree Ranga Department Stores.
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search press releases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Press Releases */}
      <div className="space-y-8">
        {filteredReleases.map((release) => (
          <article key={release.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={release.image}
                  alt={release.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar size={16} />
                    <span>{new Date(release.date).toLocaleDateString()}</span>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {release.category}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-green-600 cursor-pointer">
                  {release.title}
                </h2>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {release.excerpt}
                </p>
                
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium">
                    <span>Read Full Story</span>
                    <ExternalLink size={16} />
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
                    <Download size={16} />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {filteredReleases.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No press releases found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
      
      {/* Media Contact */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Media Contact</h2>
          <p className="text-gray-600 mb-6">
            For media inquiries, interview requests, or additional information, please contact our press team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Press Relations</h3>
              <p className="text-gray-600">press@sreeranga.com</p>
              <p className="text-gray-600">+91 89712 90721</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Marketing Department</h3>
              <p className="text-gray-600">marketing@sreeranga.com</p>
              <p className="text-gray-600">+91 89712 90721</p>
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition-colors">
              Request Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressPage;