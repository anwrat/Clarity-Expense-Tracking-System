import { useEffect, useState, useMemo } from "react";
import { getTransactions } from "../api/api";
import SummaryCards from "../components/SummaryCards";
import TransactionItem from "../components/TransactionItem";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const { data } = await getTransactions();
      setTransactions(data.data || []);
    } catch (err) {
      toast.error("Could not load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  const stats = useMemo(() => {
    return transactions.reduce((acc, t) => {
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
  }, [transactions]);

  if (loading){
    <LoadingSpinner />
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <SummaryCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Overview</h2>
            <Link 
                to="/add-transaction"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
                <span>+</span> Add New
            </Link>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {transactions.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No transactions yet.</p>
              ) : (
                transactions.map((t) => (
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