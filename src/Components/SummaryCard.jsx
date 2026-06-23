function SummaryCard({
  title,
  amount,
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 md:p-5 border border-transparent dark:border-slate-700">
      
      <p className="text-gray-500 dark:text-gray-300 text-sm md:text-base">
        {title}
      </p>

      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 text-slate-900 dark:text-white break-words">
        ₹{Number(amount).toLocaleString()}
      </h2>

    </div>
  );
}

export default SummaryCard;