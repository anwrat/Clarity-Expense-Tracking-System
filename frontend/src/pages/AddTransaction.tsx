import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTransaction } from "../api/api";
import toast from "react-hot-toast";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

export default function AddTransactionPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    type: "EXPENSE",
    date: new Date().toISOString().split('T')[0] 
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) return toast.error("Please fill required fields");
    
    setLoading(true);
    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date).toISOString()
      };
      await addTransaction(payload); 
      toast.success("Transaction recorded!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6">
      <div className="flex items-center gap-6 mb-8">
        <div className="flex-1 flex justify-between items-center px-2">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center flex-1 last:flex-none">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                step >= num ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-gray-200 text-gray-500"
              }`}>
                {step > num ? <Check size={16} /> : num}
              </div>
              {num !== 3 && (
                <div className={`h-1 flex-1 mx-2 transition-all duration-500 ${step > num ? "bg-indigo-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
        
        {/* The Close Button */}
        <button 
          onClick={() => navigate("/dashboard")}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          title="Cancel and go back"
        >
          <X size={24} />
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 min-h-105 flex flex-col relative overflow-hidden">
        
        {/* Step Content */}
        <div className="flex-1">
          {/* STEP 1: Type & Amount */}
          {step === 1 && (
            <div className="animate-in slide-in-from-right-8 fade-in duration-300">
              <h2 className="text-2xl font-black text-gray-800 mb-2">How much?</h2>
              <p className="text-gray-500 mb-8">Enter the transaction amount and type.</p>
              
              <div className="flex p-1.5 bg-gray-100 rounded-2xl mb-8">
                <button
                  type="button"
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${formData.type === 'EXPENSE' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setFormData({...formData, type: 'EXPENSE'})}
                >Expense</button>
                <button
                  type="button"
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${formData.type === 'INCOME' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setFormData({...formData, type: 'INCOME'})}
                >Income</button>
              </div>

              <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Amount</label>
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-300 group-focus-within:text-indigo-500 transition-colors">$</span>
                <input
                  type="number"
                  autoFocus
                  className="w-full pl-12 pr-6 py-6 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl text-4xl font-black outline-none transition-all placeholder:text-gray-200"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Category & Date */}
          {step === 2 && (
            <div className="animate-in slide-in-from-right-8 fade-in duration-300">
              <h2 className="text-2xl font-black text-gray-800 mb-2">Details</h2>
              <p className="text-gray-500 mb-8">Categorize this transaction.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Category</label>
                  <select
                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl text-lg font-semibold outline-none transition-all cursor-pointer appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    <option value="Food">🍔 Food & Dining</option>
                    <option value="Rent">🏠 Rent/Housing</option>
                    <option value="Salary">💰 Salary/Income</option>
                    <option value="Transport">🚗 Transport</option>
                    <option value="Shopping">🛍️ Shopping</option>
                    <option value="Entertainment">🎬 Entertainment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Date</label>
                  <input
                    type="date"
                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl text-lg font-semibold outline-none transition-all"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Description */}
          {step === 3 && (
            <div className="animate-in slide-in-from-right-8 fade-in duration-300">
              <h2 className="text-2xl font-black text-gray-800 mb-2">Final touches</h2>
              <p className="text-gray-500 mb-8">Add a small note for future reference.</p>
              
              <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Description</label>
              <textarea
                autoFocus
                className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl text-lg font-semibold outline-none min-h-40 transition-all resize-none"
                placeholder="What was this for?"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-10">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="px-6 py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-all flex items-center gap-2 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          
          {step < 3 ? (
            <button
              onClick={nextStep}
              disabled={step === 1 && !formData.amount}
              className="flex-1 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-100 active:scale-[0.98]"
            >
              Next Step <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? "Recording..." : "Finish Transaction"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}