import React, { useState } from 'react';
import { Users, Plus, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BusinessData, Employee } from '../types/business';

interface PayrollModuleProps {
  businessData: BusinessData;
  setBusinessData: (data: BusinessData) => void;
}

const PayrollModule: React.FC<PayrollModuleProps> = ({ businessData, setBusinessData }) => {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    name: '',
    position: '',
    salary: 0,
    department: '',
    hireDate: '',
    performance: 0
  });

  const marketSalaries = {
    'Software Developer': 85000,
    'Sales Manager': 75000,
    'Marketing Specialist': 55000,
    'Accountant': 60000,
    'HR Manager': 70000,
    'Customer Service': 40000,
    'Operations Manager': 80000
  };

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.position && newEmployee.salary) {
      const employee: Employee = {
        id: Date.now().toString(),
        name: newEmployee.name,
        position: newEmployee.position,
        salary: newEmployee.salary,
        department: newEmployee.department || 'General',
        hireDate: newEmployee.hireDate || new Date().toISOString().split('T')[0],
        performance: newEmployee.performance || 3
      };

      setBusinessData({
        ...businessData,
        employees: [...businessData.employees, employee]
      });

      setNewEmployee({
        name: '',
        position: '',
        salary: 0,
        department: '',
        hireDate: '',
        performance: 0
      });
      setShowAddEmployee(false);
    }
  };

  const totalPayroll = businessData.employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = businessData.employees.length > 0 ? totalPayroll / businessData.employees.length : 0;
  const revenuePerEmployee = businessData.currentRevenue && businessData.employees.length > 0 
    ? businessData.currentRevenue / businessData.employees.length : 0;

  const departmentData = businessData.employees.reduce((acc, emp) => {
    const dept = emp.department || 'General';
    if (!acc[dept]) {
      acc[dept] = { department: dept, employees: 0, totalSalary: 0 };
    }
    acc[dept].employees += 1;
    acc[dept].totalSalary += emp.salary;
    return acc;
  }, {} as Record<string, { department: string; employees: number; totalSalary: number }>);

  const chartData = Object.values(departmentData);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll & HR Analytics</h1>
          <p className="text-gray-600 mt-1">Manage your team and optimize compensation</p>
        </div>
        <button
          onClick={() => setShowAddEmployee(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{businessData.employees.length}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Employees</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">${totalPayroll.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm mt-1">Annual Payroll</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">${avgSalary.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm mt-1">Average Salary</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">${revenuePerEmployee.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm mt-1">Revenue per Employee</p>
          </div>
        </div>
      </div>

      {/* Department Chart */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="department" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total Salary']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="totalSalary" fill="url(#salaryGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Employee List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Overview</h3>
        {businessData.employees.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No employees added yet. Click "Add Employee" to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Position</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Salary</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Market Comparison</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
                </tr>
              </thead>
              <tbody>
                {businessData.employees.map((employee) => {
                  const marketSalary = marketSalaries[employee.position as keyof typeof marketSalaries] || employee.salary;
                  const salaryDiff = ((employee.salary - marketSalary) / marketSalary) * 100;
                  
                  return (
                    <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{employee.name}</td>
                      <td className="py-3 px-4 text-gray-600">{employee.position}</td>
                      <td className="py-3 px-4 text-gray-600">{employee.department}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">${employee.salary.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${
                            salaryDiff > 10 ? 'text-red-600' : 
                            salaryDiff < -10 ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {salaryDiff > 0 ? '+' : ''}{salaryDiff.toFixed(1)}%
                          </span>
                          {Math.abs(salaryDiff) > 10 && (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div
                              key={star}
                              className={`w-3 h-3 rounded-full ${
                                star <= employee.performance ? 'bg-yellow-400' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Employee Modal */}
      {showAddEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Employee</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <select
                  value={newEmployee.position}
                  onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Position</option>
                  {Object.keys(marketSalaries).map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={newEmployee.department}
                  onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Salary</label>
                <input
                  type="number"
                  value={newEmployee.salary}
                  onChange={(e) => setNewEmployee({...newEmployee, salary: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Performance (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={newEmployee.performance}
                  onChange={(e) => setNewEmployee({...newEmployee, performance: parseInt(e.target.value) || 3})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={addEmployee}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all"
              >
                Add Employee
              </button>
              <button
                onClick={() => setShowAddEmployee(false)}
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

export default PayrollModule;