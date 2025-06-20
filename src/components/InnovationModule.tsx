import React, { useState } from 'react';
import { Lightbulb, TrendingUp, Target, Zap, ExternalLink, Star } from 'lucide-react';
import { BusinessData } from '../types/business';

interface InnovationModuleProps {
  businessData: BusinessData;
}

const InnovationModule: React.FC<InnovationModuleProps> = ({ businessData }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const innovationSuggestions = [
    {
      id: 1,
      title: 'AI-Powered Customer Analytics',
      category: 'technology',
      description: 'Implement machine learning to analyze customer behavior patterns and predict purchasing decisions.',
      impact: 'High',
      effort: 'Medium',
      roi: '250%',
      timeframe: '3-6 months',
      tags: ['AI', 'Analytics', 'Customer Experience'],
      trend: 'Growing 45% YoY in your industry'
    },
    {
      id: 2,
      title: 'Subscription Revenue Model',
      category: 'business-model',
      description: 'Transform one-time purchases into recurring revenue streams through subscription offerings.',
      impact: 'High',
      effort: 'High',
      roi: '180%',
      timeframe: '6-12 months',
      tags: ['Recurring Revenue', 'Customer Retention', 'Scalability'],
      trend: 'Subscription businesses grow 5x faster'
    },
    {
      id: 3,
      title: 'Automated Inventory Management',
      category: 'operations',
      description: 'Deploy IoT sensors and predictive algorithms to optimize inventory levels and reduce waste.',
      impact: 'Medium',
      effort: 'Medium',
      roi: '120%',
      timeframe: '2-4 months',
      tags: ['IoT', 'Automation', 'Cost Reduction'],
      trend: 'Reduces inventory costs by 20-30%'
    },
    {
      id: 4,
      title: 'Sustainable Packaging Initiative',
      category: 'sustainability',
      description: 'Switch to eco-friendly packaging materials to appeal to environmentally conscious consumers.',
      impact: 'Medium',
      effort: 'Low',
      roi: '95%',
      timeframe: '1-3 months',
      tags: ['Sustainability', 'Brand Image', 'Cost Savings'],
      trend: '73% of consumers prefer sustainable brands'
    },
    {
      id: 5,
      title: 'Virtual Reality Product Demos',
      category: 'technology',
      description: 'Create immersive VR experiences to showcase products and increase conversion rates.',
      impact: 'High',
      effort: 'High',
      roi: '200%',
      timeframe: '4-8 months',
      tags: ['VR', 'Sales', 'Innovation'],
      trend: 'VR commerce market growing 30% annually'
    },
    {
      id: 6,
      title: 'Employee Wellness Program',
      category: 'hr',
      description: 'Implement comprehensive wellness initiatives to boost productivity and reduce turnover.',
      impact: 'Medium',
      effort: 'Low',
      roi: '150%',
      timeframe: '1-2 months',
      tags: ['Employee Satisfaction', 'Productivity', 'Retention'],
      trend: 'Reduces healthcare costs by 25%'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', icon: Lightbulb },
    { id: 'technology', label: 'Technology', icon: Zap },
    { id: 'business-model', label: 'Business Model', icon: Target },
    { id: 'operations', label: 'Operations', icon: TrendingUp },
    { id: 'sustainability', label: 'Sustainability', icon: Star },
    { id: 'hr', label: 'Human Resources', icon: Target }
  ];

  const filteredSuggestions = selectedCategory === 'all' 
    ? innovationSuggestions 
    : innovationSuggestions.filter(s => s.category === selectedCategory);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Innovation Lab</h1>
          <p className="text-gray-600 mt-1">Discover growth opportunities and industry trends</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Powered by industry data</p>
          <p className="text-sm font-medium text-gray-900">Updated daily</p>
        </div>
      </div>

      {/* Industry Insights */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="h-6 w-6" />
          <h3 className="text-lg font-semibold">Industry Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h4 className="font-medium mb-1">R&D Investment Trend</h4>
            <p className="text-sm opacity-90">Companies in your sector increased R&D spending by 23% this year</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h4 className="font-medium mb-1">Digital Transformation</h4>
            <p className="text-sm opacity-90">85% of businesses are adopting AI-powered solutions</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h4 className="font-medium mb-1">Sustainability Focus</h4>
            <p className="text-sm opacity-90">Green initiatives show 15% higher customer loyalty</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Innovation Categories</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Innovation Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{suggestion.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{suggestion.description}</p>
                <div className="flex items-center space-x-2 text-xs text-blue-600 mb-3">
                  <TrendingUp className="h-3 w-3" />
                  <span>{suggestion.trend}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Impact</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getImpactColor(suggestion.impact)}`}>
                    {suggestion.impact}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Effort</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getEffortColor(suggestion.effort)}`}>
                    {suggestion.effort}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Expected ROI</span>
                  <span className="text-xs font-semibold text-green-600">{suggestion.roi}</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Timeframe</span>
                  <span className="text-xs font-medium text-gray-700">{suggestion.timeframe}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {suggestion.tags.map((tag, index) => (
                <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                Learn More
              </button>
              <button className="flex items-center space-x-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                <ExternalLink className="h-3 w-3" />
                <span>Research</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Implementation Roadmap */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Implementation Roadmap</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Quick Wins (1-3 months)</h4>
              <p className="text-sm text-gray-600">Start with low-effort, high-impact initiatives like sustainable packaging and employee wellness programs.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Medium-term Projects (3-6 months)</h4>
              <p className="text-sm text-gray-600">Implement AI-powered analytics and automated inventory management systems.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Long-term Transformation (6+ months)</h4>
              <p className="text-sm text-gray-600">Launch subscription models and VR product demonstrations for competitive advantage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationModule;