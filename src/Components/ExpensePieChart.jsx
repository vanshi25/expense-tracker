import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
];

function ExpensePieChart({ data }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 md:p-5 h-[300px] md:h-[350px]">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Expense Categories
      </h2>

      <ResponsiveContainer
        width="100%"
        height="85%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
            label
          >
            {(data || []).map(
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
  );
}

export default ExpensePieChart;