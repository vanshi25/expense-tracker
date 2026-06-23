import {
  useState,
  useContext,
  useEffect,
} from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import toast from "react-hot-toast";
function AddTransaction() {
  const { addTransaction } =
    useContext(ExpenseContext);

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [type, setType] =
    useState("expense");

  const [category, setCategory] =
    useState("Food");

  useEffect(() => {
    if (type === "income") {
      setCategory("Salary");
    } else {
      setCategory("Food");
    }
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount) return;

    addTransaction({
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      category,
     date: new Date().toISOString()
    });
toast.success(
  "Transaction Added Successfully!"
);
    setTitle("");
    setAmount("");

    if (type === "income") {
      setCategory("Salary");
    } else {
      setCategory("Food");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl shadow-md mb-6"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-slate-900 dark:text-white">
        Add Transaction
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <select
          className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>
        </select>

        <select
          className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          {type === "income" ? (
            <>
              <option>Salary</option>
              <option>Freelancing</option>
              <option>Business</option>
              <option>Investment</option>
              <option>Bonus</option>
              <option>Other Income</option>
            </>
          ) : (
            <>
              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Fuel</option>
              <option>Bills</option>
              <option>Entertainment</option>
              <option>Health</option>
            </>
          )}
        </select>
      </div>

      <button
        className="w-full md:w-auto mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default AddTransaction;