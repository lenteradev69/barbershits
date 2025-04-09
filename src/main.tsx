import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { TransactionProvider } from "./contexts/TransactionContext";
import { CustomerProvider } from "./contexts/CustomerContext";
import { CatalogProvider } from "./contexts/CatalogContext";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <CustomerProvider>
        <CatalogProvider>
          <TransactionProvider>
            <App />
          </TransactionProvider>
        </CatalogProvider>
      </CustomerProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
