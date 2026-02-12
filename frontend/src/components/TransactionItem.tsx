import { deleteTransaction } from "../api/api";
import toast from "react-hot-toast";
import { Trash, Pencil } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

export default function TransactionItem({ transaction, refresh }: { transaction: any, refresh: () => void }) {
  const navigate = useNavigate();
  const isIncome = transaction.type === 'INCOME';

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteTransaction(transaction.id);
      toast.success("Transaction deleted");
      refresh();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-transaction/${transaction.id}`, { state: { transaction } });
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

        {/* Action Icons */}
        <div className="flex gap-2 transition-all">
          <Pencil
            size={18}
            onClick={handleEdit}
            className="text-indigo-500 hover:text-indigo-700 cursor-pointer"
          />
          <Trash
            size={18}
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}