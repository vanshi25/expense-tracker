import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";
import ExpensePieChart from "../components/ExpensePieChart";
import ExpenseBarChart from "../components/ExpenseBarChart";
import { ExpenseContext } from "../context/ExpenseContext";

function Dashboard() {
  const { transactions } =
    useContext(ExpenseContext);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce(
      (acc, curr) =>
        acc + curr.amount,
      0
    );

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, curr) =>
        acc + curr.amount,
      0
    );

  const balance = income - expense;
  const savings = income - expense;
const currentMonth = new Date().getMonth();

const monthlyIncome = transactions
  .filter(
    (t) =>
      t.type === "income" &&
      new Date(t.date).getMonth() === currentMonth
  )
  .reduce((acc, curr) => acc + curr.amount, 0);

const monthlyExpense = transactions
  .filter(
    (t) =>
      t.type === "expense" &&
      new Date(t.date).getMonth() === currentMonth
  )
  .reduce((acc, curr) => acc + curr.amount, 0);

const monthlySavings =
  monthlyIncome - monthlyExpense;
  const categoryData =
    transactions
      .filter(
        (t) => t.type === "expense"
      )
      .reduce((acc, curr) => {
        const existing = acc.find(
          (item) =>
            item.name ===
            curr.category
        );

        if (existing) {
          existing.value +=
            curr.amount;
        } else {
          acc.push({
            name: curr.category,
            value: curr.amount,
          });
        }

        return acc;
      }, []);

  const weeklyData =
    transactions
      .filter(
        (t) => t.type === "expense"
      )
      .reduce((acc, curr) => {
        const existing = acc.find(
          (item) =>
            item.day ===
            curr.category
        );

        if (existing) {
          existing.amount +=
            curr.amount;
        } else {
          acc.push({
            day: curr.category,
            amount: curr.amount,
          });
        }

        return acc;
      }, []);

  const recentTransactions =
    [...transactions]
      .reverse()
      .slice(0, 5);

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <SummaryCard
            title="Balance"
            amount={balance}
          />

          <SummaryCard
            title="Income"
            amount={income}
          />

          <SummaryCard
            title="Expense"
            amount={expense}
          />

          <SummaryCard
            title="Savings"
            amount={savings}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  <SummaryCard
    title="Monthly Income"
    amount={monthlyIncome}
  />

  <SummaryCard
    title="Monthly Expense"
    amount={monthlyExpense}
  />

  <SummaryCard
    title="Monthly Savings"
    amount={monthlySavings}
  />
</div>

        <AddTransaction />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <ExpensePieChart
            data={categoryData}
          />

          <ExpenseBarChart
            data={weeklyData}
          />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 mb-8">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
            Recent Activity
          </h2>

          {recentTransactions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">
              No recent transactions
            </p>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map(
                (item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b dark:border-slate-700 pb-2"
                  >
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {item.category}
                      </p>
                    </div>

                    <span
                      className={
                        item.type ===
                        "income"
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {item.type ===
                      "income"
                        ? "+"
                        : "-"}
                      ₹{item.amount}
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <TransactionList />
      </div>
    </div>
  );
}

export default Dashboard;