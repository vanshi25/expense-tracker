import {
  createContext,
  useEffect,
  useState,
} from "react";

export const ExpenseContext =
  createContext();

export const ExpenseProvider = ({
  children,
}) => {
  const [transactions, setTransactions] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "transactions"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const addTransaction = (
    transaction
  ) => {
    setTransactions((prev) => [
      ...prev,
      transaction,
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  const updateTransaction = (
    updatedTransaction
  ) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id ===
        updatedTransaction.id
          ? updatedTransaction
          : item
      )
    );
  };

  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;