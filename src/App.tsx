import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProjectionModule from './components/ProjectionModule';
import PayrollModule from './components/PayrollModule';
import PricingModule from './components/PricingModule';
import InnovationModule from './components/InnovationModule';
import { BusinessData } from './types/business';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [businessData, setBusinessData] = useState<BusinessData>({
    companyName: '',
    industry: '',
    foundedYear: new Date().getFullYear(),
    currentRevenue: 0,
    employees: [],
    expenses: [],
    revenueHistory: []
  });

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard businessData={businessData} />;
      case 'projections':
        return <ProjectionModule businessData={businessData} setBusinessData={setBusinessData} />;
      case 'payroll':
        return <PayrollModule businessData={businessData} setBusinessData={setBusinessData} />;
      case 'pricing':
        return <PricingModule businessData={businessData} setBusinessData={setBusinessData} />;
      case 'innovation':
        return <InnovationModule businessData={businessData} />;
      default:
        return <Dashboard businessData={businessData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="flex">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <main className="flex-1 p-6 ml-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderActiveModule()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;