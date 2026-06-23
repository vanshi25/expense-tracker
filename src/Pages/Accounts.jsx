
import { useEffect, useState } from "react";
import {
  FaUniversity,
  FaWallet,
  FaCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";
import Sidebar from "../Components/Sidebar";

function Accounts() {
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem("accounts");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [amounts, setAmounts] = useState({});

  useEffect(() => {
    localStorage.setItem(
      "accounts",
      JSON.stringify(accounts)
    );
  }, [accounts]);

  const addAccount = (e) => {
    e.preventDefault();

    if (!name || !balance) return;

    setAccounts([
      ...accounts,
      {
        id: Date.now(),
        name,
        balance: Number(balance),
      },
    ]);

    setName("");
    setBalance("");
  };

  const deleteAccount = (id) => {
    setAccounts(
      accounts.filter(
        (account) => account.id !== id
      )
    );
  };

  const addMoney = (id) => {
    const amount = Number(amounts[id]);

    if (!amount) return;

    setAccounts(
      accounts.map((account) =>
        account.id === id
          ? {
              ...account,
              balance:
                account.balance + amount,
            }
          : account
      )
    );

    setAmounts({
      ...amounts,
      [id]: "",
    });
  };

  const withdrawMoney = (id) => {
    const amount = Number(amounts[id]);

    if (!amount) return;

    setAccounts(
      accounts.map((account) =>
        account.id === id
          ? {
              ...account,
              balance:
                account.balance - amount,
            }
          : account
      )
    );

    setAmounts({
      ...amounts,
      [id]: "",
    });
  };

  const getIcon = (name) => {
    const text = name.toLowerCase();

    if (text.includes("bank"))
      return <FaUniversity />;

    if (text.includes("wallet"))
      return <FaWallet />;

    if (text.includes("credit"))
      return <FaCreditCard />;

    return <FaMoneyBillWave />;
  };

  const totalBalance = accounts.reduce(
    (total, account) =>
      total + account.balance,
    0
  );

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
          Accounts
        </h1>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-4 md:p-6 mb-8">
          <p className="text-lg opacity-90">
            Total Account Balance
          </p>

          <h2 className="text-4xl font-bold mt-2">
            ₹{totalBalance.toLocaleString()}
          </h2>

          <p className="mt-2 text-sm opacity-80">
            Across all your accounts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow">
            <p className="text-gray-500 dark:text-gray-300">
              Total Accounts
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {accounts.length}
            </h3>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow">
            <p className="text-gray-500 dark:text-gray-300">
              Highest Balance
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              ₹
              {accounts.length
                ? Math.max(
                    ...accounts.map(
                      (a) => a.balance
                    )
                  ).toLocaleString()
                : 0}
            </h3>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow">
            <p className="text-gray-500 dark:text-gray-300">
              Average Balance
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              ₹
              {accounts.length
                ? Math.round(
                    totalBalance /
                      accounts.length
                  ).toLocaleString()
                : 0}
            </h3>
          </div>
        </div>

        <form
          onSubmit={addAccount}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md mb-8"
        >
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
            Add Account
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Account Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Balance"
              value={balance}
              onChange={(e) =>
                setBalance(e.target.value)
              }
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
            />
          </div>

          <button className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-lg">
            Add Account
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6"
            >
              <div className="text-3xl text-blue-600 mb-4">
                {getIcon(account.name)}
              </div>

              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {account.name}
              </h2>

              <p className="text-2xl md:text-3xl font-bold mt-3 mb-4 text-slate-900 dark:text-white">
                ₹
                {account.balance.toLocaleString()}
              </p>

              <input
                type="number"
                placeholder="Enter amount"
                value={
                  amounts[account.id] || ""
                }
                onChange={(e) =>
                  setAmounts({
                    ...amounts,
                    [account.id]:
                      e.target.value,
                  })
                }
                className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-2 rounded-lg mb-3"
              />

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    addMoney(account.id)
                  }
                  className="bg-green-500 text-white px-3 py-2 rounded-lg"
                >
                  Add
                </button>

                <button
                  onClick={() =>
                    withdrawMoney(
                      account.id
                    )
                  }
                  className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
                >
                  Withdraw
                </button>

                <button
                  onClick={() =>
                    deleteAccount(
                      account.id
                    )
                  }
                  className="bg-red-500 text-white px-3 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Accounts;

