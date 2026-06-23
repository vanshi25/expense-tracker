import { Routes, Route } from "react-router-dom";
import Goals from "./pages/Goals";
import Accounts from "./pages/Accounts";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import CreditCards from "./pages/CreditCards";
import Analytics from "./pages/Analytics";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/transactions"
        element={<Transactions />}
      />
      <Route
        path="/budgets"
        element={<Budgets />}
      />
      <Route
  path="/accounts"
  element={<Accounts />}
/>
<Route
  path="/goals"
  element={<Goals />}
/>
<Route
  path="/credit-cards"
  element={<CreditCards />}
/>
<Route
  path="/analytics"
  element={<Analytics />}
/>
    </Routes>
  );
}

export default App;