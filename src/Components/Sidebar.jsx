import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaChartPie,
  FaMoneyBill,
  FaWallet,
  FaUniversity,
  FaCreditCard,
  FaChartLine,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Sidebar() {
  const [darkMode, setDarkMode] =
    useState(() => {
      return (
        localStorage.getItem("darkMode") ===
        "true"
      );
    });

  const [open, setOpen] =
    useState(false);

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      darkMode
    );

    if (darkMode) {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }
  }, [darkMode]);

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-3 rounded-lg"
      >
        <FaBars />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:static top-0 left-0 z-50
        w-64 min-h-screen
        bg-slate-900 text-white p-6
        transform transition-transform duration-300
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
      >
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">
            ExpenseTracker
          </h1>

          <button
            onClick={() =>
              setOpen(false)
            }
            className="md:hidden"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col gap-5">
          <Link
            to="/"
            onClick={() =>
              setOpen(false)
            }
            className="flex items-center gap-3 hover:text-blue-400"
          >
            <FaChartPie />
            Dashboard
          </Link>

          <Link
            to="/transactions"
            onClick={() =>
              setOpen(false)
            }
            className="flex items-center gap-3 hover:text-blue-400"
          >
            <FaMoneyBill />
            Transactions
          </Link>

          <Link
            to="/budgets"
            onClick={() =>
              setOpen(false)
            }
            className="flex items-center gap-3 hover:text-blue-400"
          >
            <FaWallet />
            Budgets
          </Link>

          <Link
            to="/accounts"
            onClick={() =>
              setOpen(false)
            }
            className="flex items-center gap-3 hover:text-blue-400"
          >
            <FaUniversity />
            Accounts
          </Link>

          <Link
            to="/goals"
            onClick={() =>
              setOpen(false)
            }
            className="flex items-center gap-3 hover:text-blue-400"
          >
            🎯 Goals
          </Link>

          <Link
            to="/credit-cards"
            onClick={() =>
              setOpen(false)
            }
            className="flex items-center gap-3 hover:text-blue-400"
          >
            <FaCreditCard />
            Credit Cards
          </Link>

          <Link
            to="/analytics"
            onClick={() =>
              setOpen(false)
            }
            className="flex items-center gap-3 hover:text-blue-400"
          >
            <FaChartLine />
            Analytics
          </Link>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="mt-8 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
          >
            {darkMode
              ? "☀ Light Mode"
              : "🌙 Dark Mode"}
          </button>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;