import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaTrash } from "react-icons/fa";

function CreditCards() {
  const [cards, setCards] = useState(() => {
    const saved =
      localStorage.getItem("creditCards");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");
  const [amounts, setAmounts] = useState({});

  useEffect(() => {
    localStorage.setItem(
      "creditCards",
      JSON.stringify(cards)
    );
  }, [cards]);

  const addCard = (e) => {
    e.preventDefault();

    if (!name || !limit) return;

    setCards([
      ...cards,
      {
        id: Date.now(),
        name,
        limit: Number(limit),
        used: 0,
      },
    ]);

    setName("");
    setLimit("");
  };

  const addSpend = (id) => {
    const amount = Number(amounts[id]);

    if (!amount) return;

    setCards(
      cards.map((card) =>
        card.id === id
          ? {
              ...card,
              used: card.used + amount,
            }
          : card
      )
    );

    setAmounts({
      ...amounts,
      [id]: "",
    });
  };

  const payBill = (id) => {
    const amount = Number(amounts[id]);

    if (!amount) return;

    setCards(
      cards.map((card) =>
        card.id === id
          ? {
              ...card,
              used: Math.max(
                0,
                card.used - amount
              ),
            }
          : card
      )
    );

    setAmounts({
      ...amounts,
      [id]: "",
    });
  };

  const deleteCard = (id) => {
    setCards(
      cards.filter(
        (card) => card.id !== id
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
          Credit Cards
        </h1>

        <form
          onSubmit={addCard}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Card Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Credit Limit"
              value={limit}
              onChange={(e) =>
                setLimit(e.target.value)
              }
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
            />
          </div>

          <button className="w-full md:w-auto mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
            Add Card
          </button>
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cards.map((card) => {
            const available =
              card.limit - card.used;

            const utilization =
              (card.used / card.limit) *
              100;

            return (
              <div
                key={card.id}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {card.name}
                  </h2>

                  <button
                    onClick={() =>
                      deleteCard(card.id)
                    }
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="mt-4 space-y-2 text-slate-700 dark:text-slate-300">
                  <p>
                    Limit: ₹
                    {card.limit.toLocaleString()}
                  </p>

                  <p>
                    Used: ₹
                    {card.used.toLocaleString()}
                  </p>

                  <p>
                    Available: ₹
                    {available.toLocaleString()}
                  </p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                  <div
                    className="bg-blue-600 h-4 rounded-full"
                    style={{
                      width: `${Math.min(
                        utilization,
                        100
                      )}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {utilization.toFixed(0)}%
                  Utilized
                </p>

                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={
                    amounts[card.id] || ""
                  }
                  onChange={(e) =>
                    setAmounts({
                      ...amounts,
                      [card.id]:
                        e.target.value,
                    })
                  }
                  className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg mt-4"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                  <button
                    onClick={() =>
                      addSpend(card.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                  >
                    Add Spend
                  </button>

                  <button
                    onClick={() =>
                      payBill(card.id)
                    }
                    className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                  >
                    Pay Bill
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CreditCards;