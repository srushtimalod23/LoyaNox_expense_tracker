import { Trash2, Pencil } from "lucide-react";

function ExpenseItem({
  expense,
  deleteExpense,
  setEditExpense,
}) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex justify-between items-center mb-3">
      
      <div>
        <h2 className="text-lg font-semibold">
          ₹{expense.amount}
        </h2>
        <p className="text-sm text-gray-500">
          {expense.category} • {expense.description}
        </p>
        <p className="text-xs text-gray-400">
          {expense.dateTime}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setEditExpense(expense)}
          className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => deleteExpense(expense.id)}
          className="p-2 bg-red-100 rounded-lg hover:bg-red-200"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;