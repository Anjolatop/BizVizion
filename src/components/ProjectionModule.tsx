import React, { useState } from 'react';
import { TrendingUp, Calendar, Target, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BusinessData } from '../types/business';

interface ProjectionModuleProps {
  businessData: BusinessData;
  setBusinessData: (data: BusinessData) => void;
}

const ProjectionModule: React.FC<ProjectionModuleProps> = ({ businessData, setBusinessData }) => {
  const [projectionYears, setProjectionYears] = useState(5);
  const [growthAssumptions, setGrowthAssumptions] = useState({
    conservative: 5,
    moderate: 12,
    aggressive: 20
  });

  // Mock projection data based on current revenue and growth assumptions
  const generateProjections = () => {
    const currentRevenue = businessData.currentRevenue || 500000;
    const years = Array.from({ length: projectionYears + 1 }, (_, i) => i);
    
    return years.map(year => ({
      year: new Date().getFullYear() + year,
      conservative: Math.round(currentRevenue * Math.pow(1 + growthAssumptions.conservative / 100, year)),
      moderate: Math.round(currentRevenue * Math.pow(1 + growthAssumptions.moderate / 100, year)),
      aggressive: Math.round(currentRevenue * Math.pow(1 + growthAssumptions.aggressive / 100, year))
    }));
  };

  const projectionData = generateProjections();

  const handleRevenueChange = (value: string) => {
    setBusinessData({
      ...businessData,
      currentRevenue: parseFloat(value) || 0
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Projections</h1>
          <p className="text-gray-600 mt-1">AI-powered forecasting for strategic planning</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Updated with latest market data</span>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Annual Revenue
            </label>
            <input
              type="number"
              value={businessData.currentRevenue}
              onChange={(e) => handleRevenueChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="500000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <select 
              value={businessData.industry}
              onChange={(e) => setBusinessData({...businessData, industry: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Industry</option>
              <option value="technology">Technology</option>
              <option value="retail">Retail</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="services">Professional Services</option>
              <option value="healthcare">Healthcare</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Projection Years
            </label>
            <select 
              value={projectionYears}
              onChange={(e) => setProjectionYears(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={5}>5 Years</option>
              <option value={10}>10 Years</option>
              <option value={15}>15 Years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Growth Assumptions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-green-200 rounded-lg bg-green-50">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-800">Conservative</span>
            </div>
            <input
              type="number"
              value={growthAssumptions.conservative}
              onChange={(e) => setGrowthAssumptions({
                ...growthAssumptions,
                conservative: parseFloat(e.target.value) || 0
              })}
              className="w-full px-3 py-2 border border-green-300 rounded-lg bg-white"
            />
            <p className="text-xs text-green-700 mt-1">Industry average growth rate</p>
          </div>
          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-blue-800">Moderate</span>
            </div>
            <input
              type="number"
              value={growthAssumptions.moderate}
              onChange={(e) => setGrowthAssumptions({
                ...growthAssumptions,
                moderate: parseFloat(e.target.value) || 0
              })}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg bg-white"
            />
            <p className="text-xs text-blue-700 mt-1">Based on your historical performance</p>
          </div>
          <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="font-medium text-purple-800">Aggressive</span>
            </div>
            <input
              type="number"
              value={growthAssumptions.aggressive}
              onChange={(e) => setGrowthAssumptions({
                ...growthAssumptions,
                aggressive: parseFloat(e.target.value) || 0
              })}
              className="w-full px-3 py-2 border border-purple-300 rounded-lg bg-white"
            />
            <p className="text-xs text-purple-700 mt-1">High-growth scenario with expansion</p>
          </div>
        </div>
      </div>

      {/* Projection Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Projections</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" stroke="#6b7280" />
            <YAxis 
              stroke="#6b7280"
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="conservative" 
              stroke="#10b981" 
              strokeWidth={3}
              name="Conservative"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="moderate" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Moderate"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="aggressive" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              name="Aggressive"
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Key Projections</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">5-Year Revenue (Moderate)</span>
              <span className="font-semibold text-gray-900">
                ${projectionData[5]?.moderate.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">10-Year Revenue (Moderate)</span>
              <span className="font-semibold text-gray-900">
                ${projectionData[Math.min(10, projectionData.length - 1)]?.moderate.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">CAGR (Moderate Scenario)</span>
              <span className="font-semibold text-green-600">{growthAssumptions.moderate}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Risk Factors</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-600">Market volatility may impact growth rates</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-600">Economic downturns could reduce projections by 15-30%</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-600">Industry disruption may require strategy pivots</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectionModule;