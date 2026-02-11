import { deleteTransaction } from "../api/api";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

export default function TransactionItem({ transaction, refresh }: { transaction: any, refresh: () => void }) {
  const isIncome = transaction.type === 'INCOME';

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteTransaction(transaction.id);
      toast.success("Transaction deleted");
      refresh();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="group flex justify-between items-center p-4 rounded-lg bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {isIncome ? '↑' : '↓'}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{transaction.category}</p>
          <p className="text-xs text-gray-500">{transaction.description || 'No description'}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className={`font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
            {isIncome ? '+' : '-'}${Number(transaction.amount).toFixed(2)}
          </p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">
            {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>
        <Trash
          onClick={handleDelete}
          className="group-hover:opacity-100 text-red-500 transition-all cursor-pointer"
        />
      </div>
    </div>
  );
}