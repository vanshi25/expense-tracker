import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function ExpenseBarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-8 h-[300px] md:h-[350px] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg md:text-xl font-semibold text-slate-700 dark:text-white">
            No expense data
          </h3>

          <p className="text-gray-500 dark:text-gray-300 mt-2">
            Add some expenses to see analytics
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 md:p-5 h-[300px] md:h-[350px]">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Expense Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height="85%"
      >
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="amount"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseBarChart;