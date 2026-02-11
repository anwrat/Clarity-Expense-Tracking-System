import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTransaction } from "../api/api";
import toast from "react-hot-toast";

export default function AddTransactionPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    type: "EXPENSE",
    date: new Date().toISOString().split('T')[0] 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      await addTransaction({ body: payload }); // Matches your Zod schema wrapper
      toast.success("Transaction added!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">New Transaction</h2>
          <button 
            onClick={() => navigate(-1)} 
            className="text-gray-400 hover:text-gray-600"
          >
            ✕ Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transaction Type Toggle */}
          <div className="flex p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${formData.type === 'EXPENSE' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500'}`}
              onClick={() => setFormData({...formData, type: 'EXPENSE'})}
            >
              Expense
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${formData.type === 'INCOME' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500'}`}
              onClick={() => setFormData({...formData, type: 'INCOME'})}
            >
              Income
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input
                type="date"
                required
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Select a category</option>
              <option value="Food">Food & Dining</option>
              <option value="Rent">Rent/Mortgage</option>
              <option value="Salary">Salary</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Transport">Transport</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
            <textarea
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              rows={3}
              placeholder="What was this for?"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
              formData.type === 'INCOME' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "Saving..." : "Save Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}