import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

function Goals() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [amounts, setAmounts] = useState({});

  useEffect(() => {
    localStorage.setItem(
      "goals",
      JSON.stringify(goals)
    );
  }, [goals]);

  const addGoal = (e) => {
    e.preventDefault();

    if (!title || !target) return;

    setGoals([
      ...goals,
      {
        id: Date.now(),
        title,
        target: Number(target),
        saved: 0,
      },
    ]);

    setTitle("");
    setTarget("");
  };

  const deleteGoal = (id) => {
    setGoals(
      goals.filter(
        (goal) => goal.id !== id
      )
    );
  };

  const addSavings = (id) => {
    const amount = Number(amounts[id]);

    if (!amount) return;

    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              saved: goal.saved + amount,
            }
          : goal
      )
    );

    setAmounts({
      ...amounts,
      [id]: "",
    });
  };

  const withdrawSavings = (id) => {
    const amount = Number(amounts[id]);

    if (!amount) return;

    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              saved: Math.max(
                0,
                goal.saved - amount
              ),
            }
          : goal
      )
    );

    setAmounts({
      ...amounts,
      [id]: "",
    });
  };

  const totalTarget = goals.reduce(
    (acc, curr) => acc + curr.target,
    0
  );

  const totalSaved = goals.reduce(
    (acc, curr) => acc + curr.saved,
    0
  );

  const totalRemaining =
    totalTarget - totalSaved;

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

   <div className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
          Financial Goals
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md">
            <p className="text-gray-500 dark:text-gray-300">
              Total Target
            </p>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              ₹{totalTarget.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md">
            <p className="text-gray-500 dark:text-gray-300">
              Total Saved
            </p>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              ₹{totalSaved.toLocaleString()}
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

        <form
          onSubmit={addGoal}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md mb-8"
        >
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
            Add Goal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Goal Name"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Target Amount"
              value={target}
              onChange={(e) =>
                setTarget(e.target.value)
              }
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
            />
          </div>

          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
            Add Goal
          </button>
        </form>

        {goals.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md text-center">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              No Goals Found
            </h3>

            <p className="text-gray-500 dark:text-gray-300 mt-2">
              Add your first goal
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => {
              const progress =
                (goal.saved /
                  goal.target) *
                100;

              const remaining =
                goal.target -
                goal.saved;

              return (
                <div
                  key={goal.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {goal.title}
                    </h2>

                    <button
                      onClick={() =>
                        deleteGoal(
                          goal.id
                        )
                      }
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="flex justify-between mt-4 text-slate-900 dark:text-white">
                    <span>
                      ₹{goal.saved.toLocaleString()}
                    </span>

                    <span>
                      ₹{goal.target.toLocaleString()}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
                    <div
                      className="bg-green-600 h-4 rounded-full"
                      style={{
                        width: `${Math.min(
                          progress,
                          100
                        )}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-300">
                    {progress.toFixed(0)}%
                    Complete
                  </p>

                  <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                    Remaining: ₹
                    {remaining.toLocaleString()}
                  </p>

                  {goal.saved >=
                    goal.target && (
                    <p className="text-green-600 font-bold mt-2">
                      🎉 Goal Achieved!
                    </p>
                  )}

                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={
                      amounts[goal.id] ||
                      ""
                    }
                    onChange={(e) =>
                      setAmounts({
                        ...amounts,
                        [goal.id]:
                          e.target.value,
                      })
                    }
                    className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-2 rounded-lg mt-4"
                  />

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button
                      onClick={() =>
                        addSavings(
                          goal.id
                        )
                      }
                      className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                    >
                      Add
                    </button>

                    <button
                      onClick={() =>
                        withdrawSavings(
                          goal.id
                        )
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Goals;