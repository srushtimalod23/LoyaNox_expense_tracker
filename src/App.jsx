import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import TotalExpense from "./components/TotalExpense";

function App() {
  const getInitialExpenses = () => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  };

  const [expenses, setExpenses] = useState(() => getInitialExpenses());
  const [editExpense, setEditExpense] = useState(null);

  // Add expense
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  // Delete expense
  const deleteExpense = (id) => {
    const updated = expenses.filter((exp) => exp.id !== id);
    setExpenses(updated);
  };

  // Update expense
  const updateExpense = (updatedExpense) => {
    const updated = expenses.map((exp) =>
      exp.id === updatedExpense.id ? updatedExpense : exp
    );

    setExpenses(updated);
    setEditExpense(null);
  };

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className="max-w-3xl mx-auto p-4">

      <h1 className="text-3xl font-bold text-center mb-6">
        Expense Tracker Dashboard 💰
      </h1>

      {/* Summary Card */}
      <TotalExpense expenses={expenses} />

      {/* Form */}
      <ExpenseForm
        addExpense={addExpense}
        editExpense={editExpense}
        updateExpense={updateExpense}
      />

      {/* List */}
      <ExpenseList
        expenses={expenses}
        deleteExpense={deleteExpense}
        setEditExpense={setEditExpense}
      />

    </div>
  );
}

export default App;