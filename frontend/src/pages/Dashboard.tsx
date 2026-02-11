import { useEffect, useState } from "react";
import { getTransactions, deleteTransaction } from "../api/api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchTransactions = async () => {
    try {
      const { data } = await getTransactions();
      setTransactions(data.data || []); 
    } catch (err) {
      toast.error("Failed to load transactions");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this transaction?")) return;
    
    try {
      await deleteTransaction(id);
      toast.success("Transaction removed");
      fetchTransactions(); 
    } catch (err) {
      toast.error("Could not delete");
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
      
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Date</th>
              <th className="p-4 font-semibold text-gray-600">Category</th>
              <th className="p-4 font-semibold text-gray-600">Description</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Amount</th>
              <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 text-sm text-gray-500">
                  {new Date(t.date).toLocaleDateString()}
                </td>
                <td className="p-4 font-medium">{t.category}</td>
                <td className="p-4 text-gray-600 text-sm">{t.description || "-"}</td>
                <td className={`p-4 text-right font-bold ${t.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'INCOME' ? '+' : '-'}${t.amount.toFixed(2)}
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => {/* Open Edit Modal */}}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(t.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}