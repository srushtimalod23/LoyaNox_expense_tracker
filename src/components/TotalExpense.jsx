function TotalExpense({ expenses }) {
  const total = expenses.reduce((sum, expense) => {
    return sum + Number(expense.amount);
  }, 0);

  return (
    <div>
      <h2>Total Expense: ₹{total}</h2>
    </div>
  );
}

export default TotalExpense;