import ExpenseItem from "./ExpenseItem";

function ExpenseList({
  expenses,
  deleteExpense,
  setEditExpense,
}) {
  return (
    <div className="space-y-3 mt-4">
      {expenses.length === 0 ? (
        <p className="text-center text-gray-500">
          No expenses added yet
        </p>
      ) : (
        expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            deleteExpense={deleteExpense}
            setEditExpense={setEditExpense}
          />
        ))
      )}
    </div>
  );
}

export default ExpenseList;