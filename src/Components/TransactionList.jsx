import toast from "react-hot-toast";
import { useContext, useState } from "react";

import { ExpenseContext } from "../Context/ExpenseContext";

function TransactionList() {
  const {
    transactions,
    deleteTransaction,
    updateTransaction,
  } = useContext(ExpenseContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] =
    useState("all");

  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      title: "",
      amount: "",
      category: "",
    });

  const exportCSV = () => {
    const headers =
      "Title,Category,Type,Amount,Date\n";

    const rows = transactions
      .map(
        (item) =>
          `${item.title},${item.category},${item.type},${item.amount},${item.date}`
      )
      .join("\n");

    const csvContent =
      headers + rows;

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const link =
      document.createElement("a");

    const url =
      URL.createObjectURL(blob);

    link.href = url;
    link.download =
      "transactions.csv";

    link.click();
  };

  const startEdit = (item) => {
    setEditingId(item.id);

    setEditData({
      title: item.title,
      amount: item.amount,
      category: item.category,
    });
  };
const saveEdit = (item) => {
  updateTransaction({
    ...item,
    title: editData.title,
    amount: Number(editData.amount),
    category: editData.category,
  });

  toast.success(
    "Transaction Updated"
  );

  setEditingId(null);
};

  const filteredTransactions =
    transactions.filter((item) => {
      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        filter === "all"
          ? true
          : item.type === filter;

      const matchesCategory =
        categoryFilter === "all"
          ? true
          : item.category ===
            categoryFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory
      );
    });

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-8 mt-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            No transactions found
          </h3>

          <p className="text-gray-500 dark:text-gray-300 mt-2">
            Add your first transaction
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 md:p-6 mt-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center mb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Recent Transactions
        </h2>

        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Export CSV
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search transaction..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg flex-1"
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
        >
          <option value="all">All</option>
          <option value="income">
            Income
          </option>
          <option value="expense">
            Expense
          </option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
          className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
        >
          <option value="all">
            All Categories
          </option>
          <option value="Salary">
            Salary
          </option>
          <option value="Freelancing">
            Freelancing
          </option>
          <option value="Business">
            Business
          </option>
          <option value="Food">
            Food
          </option>
          <option value="Travel">
            Travel
          </option>
          <option value="Shopping">
            Shopping
          </option>
          <option value="Fuel">
            Fuel
          </option>
          <option value="Bills">
            Bills
          </option>
        </select>
      </div>

      {filteredTransactions.length ===
      0 ? (
        <div className="text-center py-8 text-slate-900 dark:text-white">
          No matching transactions
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map(
            (item) => (
              <div
                key={item.id}
                className="border dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-700 shadow-sm hover:shadow-md transition"
                >
                {editingId === item.id ? (
                  <>
                    <input
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          title:
                            e.target
                              .value,
                        })
                      }
                      className="border dark:border-slate-600 dark:bg-slate-800 dark:text-white p-2 rounded w-full mb-2"
                    />

                    <input
                      type="number"
                      value={
                        editData.amount
                      }
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          amount:
                            e.target
                              .value,
                        })
                      }
                      className="border dark:border-slate-600 dark:bg-slate-800 dark:text-white p-2 rounded w-full mb-2"
                    />

                    <input
                      value={
                        editData.category
                      }
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          category:
                            e.target
                              .value,
                        })
                      }
                      className="border dark:border-slate-600 dark:bg-slate-800 dark:text-white p-2 rounded w-full mb-3"
                    />
<button
  onClick={() =>
    saveEdit(item)
  }
  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
>
  Save
</button>
                  </>
                ) : (
                  <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {item.category}
                      </p>

                      <p className="text-xs text-gray-400">
                        {item.date}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={
                          item.type ===
                          "income"
                            ? "text-green-600 font-bold"
                            : "text-red-600 font-bold"
                        }
                      >
                        ₹{item.amount}
                      </span>

                    <button
  onClick={() =>
    startEdit(item)
  }
  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
>
  Edit
</button>

                    <button
  onClick={() => {
    deleteTransaction(
      item.id
    );

    toast.success(
      "Transaction Deleted"
    );
  }}
  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
>
  Delete
</button>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default TransactionList;

