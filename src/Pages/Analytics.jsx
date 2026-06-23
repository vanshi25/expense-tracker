import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { ExpenseContext } from "../context/ExpenseContext";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

function Analytics() {
  const { transactions } =
    useContext(ExpenseContext);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce(
      (acc, curr) => acc + curr.amount,
      0
    );

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, curr) => acc + curr.amount,
      0
    );

  const savings = income - expense;
const savingsRate =
  income > 0
    ? (
        (savings / income) *
        100
      ).toFixed(0)
    : 0;
  const categoryData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => {
      const found = acc.find(
        (item) =>
          item.name === curr.category
      );

      if (found) {
        found.value += curr.amount;
      } else {
        acc.push({
          name: curr.category,
          value: curr.amount,
        });
      }

      return acc;
    }, []);

  const topCategory =
    categoryData.length > 0
      ? categoryData.reduce((a, b) =>
          a.value > b.value ? a : b
        ).name
      : "N/A";

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

   <div className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
          Analytics
        </h1>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md">
    <p className="text-gray-500 dark:text-gray-300">
      Monthly Income
    </p>

    <h2 className="text-3xl font-bold text-green-600">
      ₹{income.toLocaleString()}
    </h2>
  </div>

  <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md">
    <p className="text-gray-500 dark:text-gray-300">
      Monthly Expense
    </p>

    <h2 className="text-3xl font-bold text-red-600">
      ₹{expense.toLocaleString()}
    </h2>
  </div>

  <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md">
    <p className="text-gray-500 dark:text-gray-300">
      Savings Rate
    </p>

    <h2 className="text-3xl font-bold text-blue-600">
      {savingsRate}%
    </h2>
  </div>
</div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow">
            <p className="text-gray-500 dark:text-gray-300">
              Total Income
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              ₹{income.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow">
            <p className="text-gray-500 dark:text-gray-300">
              Total Expense
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              ₹{expense.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow">
            <p className="text-gray-500 dark:text-gray-300">
              Net Savings
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              ₹{savings.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow">
            <p className="text-gray-500 dark:text-gray-300">
              Transactions
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {transactions.length}
            </h2>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 p-4 md:p-5 rounded-2xl shadow h-[300px] md:h-[350px]">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-slate-900 dark:text-white">
              Expense Categories
            </h2>

            <ResponsiveContainer
              width="100%"
              height="85%"
            >
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  outerRadius={90}
                  label
                >
                  {categoryData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 md:p-5 rounded-2xl shadow h-[300px] md:h-[350px]">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-slate-900 dark:text-white">
              Category Spending
            </h2>

            <ResponsiveContainer
              width="100%"
              height="85%"
            >
              <BarChart
                data={categoryData}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            Insights
          </h2>

          <p className="mb-2 text-slate-700 dark:text-slate-300">
            Top Spending Category:
            <strong>
              {" "}
              {topCategory}
            </strong>
          </p>

          <p className="mb-2 text-slate-700 dark:text-slate-300">
            Total Transactions:
            <strong>
              {" "}
              {transactions.length}
            </strong>
          </p>

          <p className="text-slate-700 dark:text-slate-300">
            Savings Rate:
            <strong>
              {" "}
              {income > 0
                ? (
                    (savings /
                      income) *
                    100
                  ).toFixed(0)
                : 0}
              %
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;