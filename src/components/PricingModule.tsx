import React, { useState } from 'react';
import { DollarSign, TrendingUp, AlertCircle, Calculator, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { BusinessData, Expense } from '../types/business';

interface PricingModuleProps {
  businessData: BusinessData;
  setBusinessData: (data: BusinessData) => void;
}

const PricingModule: React.FC<PricingModuleProps> = ({ businessData, setBusinessData }) => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    category: '',
    amount: 0,
    description: '',
    frequency: 'monthly'
  });

  const [pricingInputs, setPricingInputs] = useState({
    currentPrice: 100,
    costOfGoods: 40,
    inflationRate: 3.2,
    competitorPrice: 110
  });

  const addExpense = () => {
    if (newExpense.category && newExpense.amount) {
      const expense: Expense = {
        id: Date.now().toString(),
        category: newExpense.category,
        amount: newExpense.amount,
        description: newExpense.description || '',
        frequency: newExpense.frequency || 'monthly'
      };

      setBusinessData({
        ...businessData,
        expenses: [...businessData.expenses, expense]
      });

      setNewExpense({
        category: '',
        amount: 0,
        description: '',
        frequency: 'monthly'
      });
      setShowAddExpense(false);
    }
  };

  const totalExpenses = businessData.expenses.reduce((sum, exp) => {
    const multiplier = exp.frequency === 'monthly' ? 12 : exp.frequency === 'quarterly' ? 4 : 1;
    return sum + (exp.amount * multiplier);
  }, 0);

  const expensesByCategory = businessData.expenses.reduce((acc, exp) => {
    const multiplier = exp.frequency === 'monthly' ? 12 : exp.frequency === 'quarterly' ? 4 : 1;
    const annualAmount = exp.amount * multiplier;
    
    if (!acc[exp.category]) {
      acc[exp.category] = 0;
    }
    acc[exp.category] += annualAmount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  // Pricing calculations
  const currentMargin = ((pricingInputs.currentPrice - pricingInputs.costOfGoods) / pricingInputs.currentPrice) * 100;
  const adjustedCost = pricingInputs.costOfGoods * (1 + pricingInputs.inflationRate / 100);
  const recommendedPrice = adjustedCost / (1 - (currentMargin / 100));
  const competitorComparison = ((pricingInputs.currentPrice - pricingInputs.competitorPrice) / pricingInputs.competitorPrice) * 100;

  const pricingScenarios = [
    {
      scenario: 'Current',
      price: pricingInputs.currentPrice,
      margin: currentMargin,
      competitive: 'Baseline'
    },
    {
      scenario: 'Inflation Adjusted',
      price: recommendedPrice,
      margin: currentMargin,
      competitive: recommendedPrice > pricingInputs.competitorPrice ? 'Above Market' : 'Below Market'
    },
    {
      scenario: 'Market Match',
      price: pricingInputs.competitorPrice,
      margin: ((pricingInputs.competitorPrice - adjustedCost) / pricingInputs.competitorPrice) * 100,
      competitive: 'Market Rate'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pricing & Cost Analysis</h1>
          <p className="text-gray-600 mt-1">Optimize your pricing strategy and manage expenses</p>
        </div>
        <button
          onClick={() => setShowAddExpense(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Cost Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">${totalExpenses.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm mt-1">Annual Expenses</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">
              {businessData.currentRevenue ? ((businessData.currentRevenue - totalExpenses) / businessData.currentRevenue * 100).toFixed(1) : '0'}%
            </h3>
            <p className="text-gray-600 text-sm mt-1">Profit Margin</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
              <Calculator className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{businessData.expenses.length}</h3>
            <p className="text-gray-600 text-sm mt-1">Expense Categories</p>
          </div>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pieData.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Annual Cost']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Calculator</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Price ($)</label>
              <input
                type="number"
                value={pricingInputs.currentPrice}
                onChange={(e) => setPricingInputs({...pricingInputs, currentPrice: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost of Goods ($)</label>
              <input
                type="number"
                value={pricingInputs.costOfGoods}
                onChange={(e) => setPricingInputs({...pricingInputs, costOfGoods: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Inflation Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={pricingInputs.inflationRate}
                onChange={(e) => setPricingInputs({...pricingInputs, inflationRate: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Competitor Price ($)</label>
              <input
                type="number"
                value={pricingInputs.competitorPrice}
                onChange={(e) => setPricingInputs({...pricingInputs, competitorPrice: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Scenarios */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Scenarios</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Scenario</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Margin</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Market Position</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {pricingScenarios.map((scenario, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{scenario.scenario}</td>
                  <td className="py-3 px-4 text-gray-900">${scenario.price.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${scenario.margin > 30 ? 'text-green-600' : scenario.margin > 15 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {scenario.margin.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{scenario.competitive}</td>
                  <td className="py-3 px-4">
                    {index === 1 && (
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-blue-600">Recommended</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expense List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Details</h3>
        {businessData.expenses.length === 0 ? (
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No expenses tracked yet. Add expenses to analyze your cost structure.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Frequency</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Annual Cost</th>
                </tr>
              </thead>
              <tbody>
                {businessData.expenses.map((expense) => {
                  const multiplier = expense.frequency === 'monthly' ? 12 : expense.frequency === 'quarterly' ? 4 : 1;
                  const annualCost = expense.amount * multiplier;
                  
                  return (
                    <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{expense.category}</td>
                      <td className="py-3 px-4 text-gray-600">{expense.description}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">${expense.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-gray-600 capitalize">{expense.frequency}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">${annualCost.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Expense</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="Rent">Rent</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Software">Software</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Travel">Travel</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select
                  value={newExpense.frequency}
                  onChange={(e) => setNewExpense({...newExpense, frequency: e.target.value as 'monthly' | 'quarterly' | 'annually'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={addExpense}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all"
              >
                Add Expense
              </button>
              <button
                onClick={() => setShowAddExpense(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingModule;