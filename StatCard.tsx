import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, isPositive, icon }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
          {subValue && (
            <p className={`text-sm mt-1 font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {subValue}
            </p>
          )}
        </div>
        <div className="p-3 bg-brand-50 rounded-xl text-brand-600">
          {icon}
        </div>
      </div>
    </div>
  );
};