import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { FaTrash } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

function Budgets() {
  const { transactions } =
    useContext(ExpenseContext);

  const [budgets, setBudgets] = useState(() => {
    const saved =
      localStorage.getItem("budgets");
    return saved ? JSON.parse(saved) : [];
  });

  const [category, setCategory] =
    useState("");

  const [limit, setLimit] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      "budgets",
      JSON.stringify(budgets)
    );
  }, [budgets]);

  const addBudget = (e) => {
    e.preventDefault();

    if (!category || !limit) return;

    setBudgets([
      ...budgets,
      {
        id: Date.now(),
        category,
        limit: Number(limit),
      },
    ]);

    setCategory("");
    setLimit("");
  };

  const deleteBudget = (id) => {
    setBudgets(
      budgets.filter(
        (budget) =>
          budget.id !== id
      )
    );
  };

  const totalBudget =
    budgets.reduce(
      (acc, curr) =>
        acc + curr.limit,
      0
    );

  const totalSpent =
    budgets.reduce(
      (acc, budget) => {
        const spent =
          transactions
            .filter(
              (t) =>
                t.type ===
                  "expense" &&
                t.category.toLowerCase() ===
                  budget.category.toLowerCase()
            )
            .reduce(
              (sum, curr) =>
                sum + curr.amount,
              0
            );

        return acc + spent;
      },
      0
    );

  const totalRemaining =
    totalBudget - totalSpent;

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

   <div className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
          Budgets
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md">
            <p className="text-gray-500 dark:text-gray-300">
              Total Budget
            </p>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              ₹{totalBudget.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md">
            <p className="text-gray-500 dark:text-gray-300">
              Total Spent
            </p>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              ₹{totalSpent.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md">
            <p className="text-gray-500 dark:text-gray-300">
              Remaining
            </p>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              ₹{totalRemaining.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Add Budget */}
        <form
          onSubmit={addBudget}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md mb-8"
        >
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
            Add Budget
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Budget Limit"
              value={limit}
              onChange={(e) =>
                setLimit(
                  e.target.value
                )
              }
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
            />
          </div>

          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
            Add Budget
          </button>
        </form>

        {budgets.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              No Budgets Found
            </h3>

            <p className="text-gray-500 dark:text-gray-300 mt-2">
              Add your first budget
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {budgets.map(
              (budget) => {
                const spent =
                  transactions
                    .filter(
                      (t) =>
                        t.type ===
                          "expense" &&
                        t.category.toLowerCase() ===
                          budget.category.toLowerCase()
                    )
                    .reduce(
                      (
                        acc,
                        curr
                      ) =>
                        acc +
                        curr.amount,
                      0
                    );

                const percentage =
                  budget.limit > 0
                    ? (spent /
                        budget.limit) *
                      100
                    : 0;

                const remaining =
                  budget.limit -
                  spent;

                return (
                  <div
                    key={
                      budget.id
                    }
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {
                          budget.category
                        }
                      </h2>

                      <button
                        onClick={() =>
                          deleteBudget(
                            budget.id
                          )
                        }
                        className="text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <p className="mb-3 font-medium text-slate-900 dark:text-white">
                      ₹{spent} / ₹
                      {
                        budget.limit
                      }
                    </p>

                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-600 h-4 rounded-full"
                        style={{
                          width: `${Math.min(
                            percentage,
                            100
                          )}%`,
                        }}
                      />
                    </div>

                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-300">
                      {percentage.toFixed(
                        0
                      )}
                      % Used
                    </p>

                    <div className="mt-4 flex justify-between">
                      <span className="text-gray-500 dark:text-gray-300">
                        Remaining
                      </span>

                      <span className="font-semibold text-slate-900 dark:text-white">
                        ₹
                        {remaining.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Budgets;