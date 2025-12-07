import React from 'react';
import { User } from '../types';
import { Header } from './Header';
import { StatCard } from './StatCard';
import { InvestmentChart } from './InvestmentChart';
import { TrendingUp, IndianRupee, PieChart, Lock, AlertCircle, Calendar, MapPin, Briefcase, Award } from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  // Hardcoded data from requirements
  const investmentData = {
    fundName: 'SBI ELSS Fund',
    investedAmount: 180000,
    currentValue: 187200,
    startDate: '12 April 2024',
    lockInYears: 3,
    returnPercentage: 4,
    withdrawalMessage: 'You can withdraw only after 24 months'
  };

  const profit = investmentData.currentValue - investmentData.investedAmount;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header user={user} onLogout={onLogout} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Welcome, {user.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-500 mt-1">Here is an overview of your investment portfolio.</p>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            label="Total Invested" 
            value={`₹${investmentData.investedAmount.toLocaleString('en-IN')}`}
            icon={<IndianRupee size={24} />}
          />
          <StatCard 
            label="Current Value" 
            value={`₹${investmentData.currentValue.toLocaleString('en-IN')}`}
            subValue={`+₹${profit.toLocaleString('en-IN')} (${investmentData.returnPercentage}%)`}
            isPositive={true}
            icon={<TrendingUp size={24} />}
          />
          <StatCard 
            label="Total Funds" 
            value="01" 
            icon={<PieChart size={24} />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details & Info */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Main Investment Detail Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                    SBI
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{investmentData.fundName}</h3>
                    <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">Equity • ELSS</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Calendar size={16} />
                    <span>Start Date</span>
                  </div>
                  <span className="font-medium text-slate-900">{investmentData.startDate}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Lock size={16} />
                    <span>Lock-in Period</span>
                  </div>
                  <span className="font-medium text-slate-900">{investmentData.lockInYears} Years</span>
                </div>

                {/* Withdrawal Status Warning */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-sm font-semibold text-amber-900 mb-1">Withdrawal Locked</h4>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      {investmentData.withdrawalMessage}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500">Net Asset Value (NAV)</span>
                    <span className="font-medium text-slate-900">₹142.45</span>
                  </div>
                   <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Units Held</span>
                    <span className="font-medium text-slate-900">1,263.54</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fund Manager & Company Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Fund Management</h3>
              </div>
              <div className="p-6 space-y-6">
                
                {/* Manager Info */}
                <div className="flex gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 shrink-0">
                        <Briefcase size={18} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">Mr. Rakesh Gupta</h4>
                        <p className="text-xs text-brand-600 font-medium mb-1">Senior Fund Manager</p>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                            <Award size={12} />
                            <span>CFA, MBA (Finance) • 18+ Years Exp.</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Specializes in long-term equity wealth creation with a focus on sustainable growth companies.
                        </p>
                    </div>
                </div>

                <div className="border-t border-slate-50 pt-4">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Company Address</h4>
                    <div className="flex gap-3 text-sm text-slate-600">
                        <MapPin size={18} className="shrink-0 text-brand-500 mt-0.5" />
                        <address className="not-italic">
                            Rakesh & Associates<br/>
                            1402, SBC Park, Baner,<br/>
                            Pune, 411045
                        </address>
                    </div>
                </div>

              </div>
            </div>

          </div>

          {/* Chart Section */}
          <div className="lg:col-span-2">
            <InvestmentChart currentValue={investmentData.currentValue} />
          </div>
        </div>
      </main>
    </div>
  );
};