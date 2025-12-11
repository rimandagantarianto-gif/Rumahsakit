import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';
import { TrendingUp, Users, Clock, AlertCircle } from 'lucide-react';
import { FINANCIAL_DATA } from '../mockData';

const StatCard = ({ icon: Icon, title, value, subtext, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      <p className={`text-xs mt-2 ${color === 'red' ? 'text-red-500' : 'text-emerald-600'} font-medium flex items-center gap-1`}>
        {subtext}
      </p>
    </div>
    <div className={`p-3 rounded-lg ${color === 'red' ? 'bg-red-50 text-red-500' : 'bg-teal-50 text-teal-600'}`}>
      <Icon size={24} />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Hospital Overview</h1>
        <p className="text-slate-500">Real-time operational and financial insights.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={TrendingUp} 
          title="Monthly Revenue" 
          value="Rp 550M" 
          subtext="+8.5% from last month"
          color="green" 
        />
        <StatCard 
          icon={Users} 
          title="Patient Admittance" 
          value="1,245" 
          subtext="+12% increase"
          color="green" 
        />
        <StatCard 
          icon={Clock} 
          title="Avg. Billing Time" 
          value="3.2 mins" 
          subtext="Reduced from 15 mins"
          color="green" 
        />
        <StatCard 
          icon={AlertCircle} 
          title="Pending Claims" 
          value="24" 
          subtext="Action required"
          color="red" 
        />
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        
        {/* Revenue vs Expenses */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Financial Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={FINANCIAL_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" tickFormatter={(value) => `${value / 1000000}M`} />
                <RechartsTooltip 
                  formatter={(value: number) => `Rp ${value.toLocaleString()}`}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#0d9488" strokeWidth={3} dot={{ r: 4 }} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Efficiency Metrics */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Operational Efficiency (%)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FINANCIAL_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[80, 100]} />
                <RechartsTooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="billingEfficiency" fill="#0f766e" radius={[4, 4, 0, 0]} name="Billing Efficiency" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;