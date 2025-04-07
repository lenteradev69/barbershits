import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import AppLayout from "./components/layout/AppLayout";
import routes from "tempo-routes";
import { TransactionProvider } from "./contexts/TransactionContext";

// Lazy load components for better performance
const POSSystem = lazy(() => import("./components/pos/POSSystem"));
const DataManagement = lazy(
  () => import("./components/management/DataManagement"),
);
const AnalyticsDashboard = lazy(
  () => import("./components/dashboard/AnalyticsDashboard"),
);
const AppointmentsPage = lazy(
  () => import("./components/appointments/AppointmentsPage"),
);
const SettingsPage = lazy(() => import("./components/settings/SettingsPage"));
const HelpPage = lazy(() => import("./components/help/HelpPage"));

function App() {
  return (
    <TransactionProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pos" element={<POSSystem />} />
            <Route path="/customers" element={<DataManagement />} />
            <Route path="/products" element={<DataManagement />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </AppLayout>
      </Suspense>
    </TransactionProvider>
  );
}

export default App;
