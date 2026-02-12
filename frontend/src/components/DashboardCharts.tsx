import { useMemo } from "react";
import { TrendingUp, PieChart as PieIcon } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#3b82f6', '#10b981'];

interface DashboardChartsProps {
  filteredTransactions: any[];
  stats: { income: number; expenses: number; balance: number };
}

export default function DashboardCharts({ filteredTransactions, stats }: DashboardChartsProps) {
  // Bar Chart data (Income vs Expenses)
  const barData = [
    { name: 'Income', amount: stats.income, color: '#10b981' },
    { name: 'Expenses', amount: stats.expenses, color: '#ef4444' }
  ];

  // Pie Chart data (Expense breakdown)
  const pieData = useMemo(() => {
    const totals: Record<string, number> = {};
    filteredTransactions.filter(t => t.type === 'EXPENSE').forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
    });
    return Object.keys(totals).map(key => ({ name: key, value: totals[key] }));
  }, [filteredTransactions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
        <div className="flex items-center gap-2 mb-6 text-gray-800">
          <TrendingUp size={20} className="text-indigo-600" />
          <h3 className="text-lg font-bold">Income vs Expenses</h3>
        </div>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]} barSize={60}>
                {barData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart Container */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6 text-gray-800">
          <PieIcon size={20} className="text-indigo-600" />
          <h3 className="text-lg font-bold">Spending by Category</h3>
        </div>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {pieData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}