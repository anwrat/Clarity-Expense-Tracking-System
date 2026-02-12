import { useEffect, useState, useMemo } from "react";
import { getTransactions } from "../api/api";
import SummaryCards from "../components/SummaryCards";
import TransactionItem from "../components/TransactionItem";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { Calendar, Tag, X } from "lucide-react"; 

export default function Dashboard() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Filter State ---
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTransactions = async () => {
    try {
      const { data } = await getTransactions();
      setTransactions(data.data || []);
    } catch (err) {
      console.error("Could not load transactions: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  //Get unique categories from the data for the dropdown
  const categories = useMemo(() => {
    return Array.from(new Set(transactions.map((t) => t.category)));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const tDate = new Date(t.date).getTime();
      const start = startDate ? new Date(startDate).getTime() : null;
      const end = endDate ? new Date(endDate).getTime() : null;

      const matchesCategory = categoryFilter ? t.category === categoryFilter : true;
      const matchesStart = start ? tDate >= start : true;
      const matchesEnd = end ? tDate <= end : true;

      return matchesCategory && matchesStart && matchesEnd;
    });
  }, [transactions, categoryFilter, startDate, endDate]);

  const stats = useMemo(() => {
    return filteredTransactions.reduce((acc, t) => {
      const amt = Number(t.amount);
      if (t.type === 'INCOME') {
        acc.income += amt;
        acc.balance += amt;
      } else {
        acc.expenses += amt;
        acc.balance -= amt;
      }
      return acc;
    }, { income: 0, expenses: 0, balance: 0 });
  }, [filteredTransactions]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <SummaryCards stats={stats} />

      {/* --- FILTER BAR --- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-50">
          <label className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
            <Tag size={14} /> Category
          </label>
          <select 
            className="w-full bg-gray-50 border-none rounded-lg p-2 text-sm focus:ring-2 ring-indigo-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="flex-1 min-w-37.5">
          <label className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
            <Calendar size={14} /> From
          </label>
          <input 
            type="date" 
            className="w-full bg-gray-50 border-none rounded-lg p-2 text-sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex-1 min-w-37.5">
          <label className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
            <Calendar size={14} /> To
          </label>
          <input 
            type="date" 
            className="w-full bg-gray-50 border-none rounded-lg p-2 text-sm"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {(categoryFilter || startDate || endDate) && (
          <button 
            onClick={() => { setCategoryFilter(""); setStartDate(""); setEndDate(""); }}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-bold flex items-center gap-1"
          >
            <X size={16} /> Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Transactions ({filteredTransactions.length})</h3>
              <Link 
                to="/add-transaction"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all"
              >
                + Add New
              </Link>
            </div>

            <div className="space-y-3">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No transactions match your filters.</p>
                </div>
              ) : (
                filteredTransactions.map((t) => (
                  <TransactionItem key={t.id} transaction={t} refresh={fetchTransactions} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}