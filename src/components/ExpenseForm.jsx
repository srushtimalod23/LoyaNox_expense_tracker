import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { IndianRupee, Tag, FileText, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function ExpenseForm({
  addExpense,
  editExpense,
  updateExpense,
}) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    if (editExpense) {
      setAmount(editExpense.amount);

      const predefinedCategories = [
        "Travel",
        "Shopping",
        "Food",
        "Groceries",
        "Entertainment",
        "Bills",
        "Healthcare",
        "Education",
        "Transport",
      ];

      if (predefinedCategories.includes(editExpense.category)) {
        setCategory(editExpense.category);
        setCustomCategory("");
      } else {
        setCategory("Other");
        setCustomCategory(editExpense.category);
      }

      setDescription(editExpense.description);
      setDateTime(editExpense.dateTime || "");
    }
  }, [editExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalCategory =
      category === "Other"
        ? customCategory.trim()
        : category;

    if (
      !amount ||
      !finalCategory ||
      !description ||
      !dateTime
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editExpense) {
      updateExpense({
        ...editExpense,
        amount,
        category: finalCategory,
        description,
        dateTime,
      });
    } else {
      addExpense({
        id: Date.now(),
        amount,
        category: finalCategory,
        description,
        dateTime,
      });
    }

    // Reset form
    setAmount("");
    setCategory("");
    setCustomCategory("");
    setDescription("");
    setDateTime("");
  };

  return (
    <Card className="p-6 rounded-2xl shadow-lg mb-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        {editExpense ? "Update Expense" : "Add Expense"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Amount */}
        <div className="flex items-center gap-3 border rounded-lg px-3">
          <IndianRupee size={18} />
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-0 shadow-none focus-visible:ring-0"
          />
        </div>

        {/* Category */}
        <div className="flex items-center gap-3 border rounded-lg px-3 py-2">
          <Tag size={18} />

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="border-0 shadow-none focus:ring-0">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Travel">✈️ Travel</SelectItem>
              <SelectItem value="Shopping">🛍 Shopping</SelectItem>
              <SelectItem value="Food">🍕 Food</SelectItem>
              <SelectItem value="Groceries">🛒 Groceries</SelectItem>
              <SelectItem value="Entertainment">🎬 Entertainment</SelectItem>
              <SelectItem value="Bills">💡 Bills</SelectItem>
              <SelectItem value="Healthcare">🏥 Healthcare</SelectItem>
              <SelectItem value="Education">📚 Education</SelectItem>
              <SelectItem value="Transport">🚗 Transport</SelectItem>
              <SelectItem value="Other">➕ Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Custom Category */}
        {category === "Other" && (
          <Input
            type="text"
            placeholder="Enter your category"
            value={customCategory}
            onChange={(e) =>
              setCustomCategory(e.target.value)
            }
          />
        )}

        {/* Description */}
        <div className="flex items-center gap-3 border rounded-lg px-3">
          <FileText size={18} />
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="border-0 shadow-none focus-visible:ring-0"
          />
        </div>

        {/* Date & Time */}
<div className="flex items-center gap-3 border rounded-lg px-3">
  <Calendar size={18} />
  <Input
    type="datetime-local"
    value={dateTime}
    onChange={(e) => setDateTime(e.target.value)}
    className="border-0 shadow-none focus-visible:ring-0"
  />
</div>

        <Button type="submit" className="w-full">
          {editExpense ? "Update Expense" : "Add Expense"}
        </Button>

      </form>
    </Card>
  );
}

export default ExpenseForm;