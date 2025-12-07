import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TimeRange, ChartDataPoint } from '../types';

interface InvestmentChartProps {
  currentValue: number;
}

export const InvestmentChart: React.FC<InvestmentChartProps> = ({ currentValue }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange['1Y']);

  // Generate a stable master dataset for history (2 years)
  // This ensures that when switching time ranges, the data remains consistent (subsets of the same history)
  const masterData = useMemo(() => {
    const points: ChartDataPoint[] = [];
    const now = new Date();
    const daysOfHistory = 730; // ~2 years
    
    // Start with current value
    let val = currentValue;

    // Generate points backwards
    for (let i = 0; i < daysOfHistory; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      
      points.unshift({
        date: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        value: Math.round(val)
      });

      // Calculate previous day's value using a reverse random walk
      // We assume a slight upward trend over time, so history should generally be lower
      const dailyVolatility = 0.015; // 1.5% daily fluctuation
      // (Math.random() - 0.48) is slightly weighted negative, so when subtracting change,
      // val (history) tends to be lower than current.
      const randomFactor = (Math.random() - 0.48); 
      const change = val * dailyVolatility * randomFactor;
      val -= change;
    }
    return points;
  }, [currentValue]);

  // Slice the master data based on selected time range
  const data = useMemo(() => {
    let days = 365;
    switch (timeRange) {
      case TimeRange['1M']: days = 30; break;
      case TimeRange['3M']: days = 90; break;
      case TimeRange['6M']: days = 180; break;
      case TimeRange['1Y']: days = 365; break;
      case TimeRange.ALL: days = masterData.length; break;
      default: days = 365;
    }
    // Take the last 'days' from the master data
    return masterData.slice(-days);
  }, [timeRange, masterData]);

  // Calculate min/max for Y-axis domain to make the chart look dynamic and focused
  const domain = useMemo(() => {
    if (data.length === 0) return ['auto', 'auto'];
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1; // Add 10% padding
    return [Math.round(min - padding), Math.round(max + padding)];
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Portfolio Growth</h3>
          <p className="text-sm text-slate-500">NAV performance over time</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg overflow-x-auto max-w-full">
          {(Object.keys(TimeRange) as Array<keyof typeof TimeRange>).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(TimeRange[range])}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                timeRange === TimeRange[range]
                  ? 'bg-white text-brand-700 shadow-sm ring-1 ring-black/5'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              minTickGap={40}
              interval="preserveStartEnd"
            />
            <YAxis 
              hide={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              domain={domain}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              width={50}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Value']}
              labelStyle={{ color: '#64748b', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#0ea5e9" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};