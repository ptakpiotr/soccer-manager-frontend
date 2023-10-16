import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Chart, LinearScale } from "chart.js/auto";
import "./styles/index.scss";

Chart.register(LinearScale);

const client = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 20,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <DndProvider options={HTML5toTouch}>
        <App />
      </DndProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
