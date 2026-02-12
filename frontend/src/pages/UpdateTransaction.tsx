import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { updateTransaction } from "../api/api";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function UpdateTransactionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

  const transaction = state?.transaction;

  const [formData, setFormData] = useState({
    amount: transaction?.amount?.toString() || "",
    category: transaction?.category || "",
    description: transaction?.description || "",
    type: transaction?.type || "EXPENSE",
    date: transaction?.date 
      ? new Date(transaction.date).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) return toast.error("Required fields missing");

    setLoading(true);
    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date).toISOString()
      };
      
      await updateTransaction(id!, payload);
      toast.success("Transaction updated successfully!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  if (!transaction) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500">Transaction not found.</p>
        <button onClick={() => navigate("/dashboard")} className="text-indigo-600 font-bold mt-4">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-gray-800">Edit Transaction</h1>
        <button 
          onClick={() => navigate("/dashboard")} 
          className="p-2 rounded-full cursor-pointer bg-gray-100 text-red-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Transaction Type Toggle */}
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Type</label>
            <div className="flex p-1 bg-gray-100 rounded-2xl">
              <button
                type="button"
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${formData.type === 'EXPENSE' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500'}`}
                onClick={() => setFormData({...formData, type: 'EXPENSE'})}
              >Expense</button>
              <button
                type="button"
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${formData.type === 'INCOME' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500'}`}
                onClick={() => setFormData({...formData, type: 'INCOME'})}
              >Income</button>
            </div>
          </div>

          {/* Amount Input */}
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Amount</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">$</span>
              <input
                type="number"
                step="0.01"
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl text-2xl font-bold outline-none transition-all"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Category</label>
            <select
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl font-semibold outline-none appearance-none cursor-pointer"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Food">Food & Dining</option>
              <option value="Rent">Rent/Housing</option>
              <option value="Salary">Salary/Income</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Date</label>
            <input
              type="date"
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl font-semibold outline-none"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          {/* Description Textarea */}
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Description</label>
            <textarea
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl font-semibold outline-none resize-none min-h-30"
              placeholder="What was this for?"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Saving Changes..." : <>Save Transaction</>}
        </button>
      </form>
    </div>
  );
}