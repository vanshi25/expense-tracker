import Goals from "./Pages/Goals";
import Accounts from "./Pages/Accounts";

import Dashboard from "./Pages/Dashboard";
import Transactions from "./Pages/Transactions";
import Budgets from "./Pages/Budgets";
import CreditCards from "./Pages/CreditCards";
import Analytics from "./Pages/Analytics";
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