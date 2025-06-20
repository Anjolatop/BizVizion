export interface Employee {
  id: string;
  name: string;
  position: string;
  salary: number;
  department: string;
  hireDate: string;
  performance: number; // 1-5 scale
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  frequency: 'monthly' | 'quarterly' | 'annually';
}

export interface RevenueData {
  year: number;
  revenue: number;
}

export interface BusinessData {
  companyName: string;
  industry: string;
  foundedYear: number;
  currentRevenue: number;
  employees: Employee[];
  expenses: Expense[];
  revenueHistory: RevenueData[];
}