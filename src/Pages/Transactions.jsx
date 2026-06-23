import Sidebar from "../Components/Sidebar";
 import TransactionList from "../Components/TransactionList";
function Transactions() {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
          Transactions
        </h1>

        <TransactionList />
      </div>
    </div>
  );
}

export default Transactions;