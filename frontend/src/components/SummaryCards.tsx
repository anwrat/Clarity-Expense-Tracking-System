interface Stats {
  income: number;
  expenses: number;
  balance: number;
}

export default function SummaryCards({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card title="Total Balance" value={stats.balance} type="neutral" />
      <Card title="Total Income" value={stats.income} type="income" />
      <Card title="Total Expenses" value={stats.expenses} type="expense" />
    </div>
  );
}

function Card({ title, value, type }: { title: string; value: number; type: 'income' | 'expense' | 'neutral' }) {
  const colors = {
    income: "text-green-600 border-t-green-500",
    expense: "text-red-600 border-t-red-500",
    neutral: "text-indigo-600 border-t-indigo-500"
  };
  
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 ${colors[type]}`}>
      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{title}</p>
      <p className="text-2xl font-black mt-1">${value.toFixed(2)}</p>
    </div>
  );
}