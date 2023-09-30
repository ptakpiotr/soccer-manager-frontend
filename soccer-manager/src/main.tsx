import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

import { Chart, LinearScale } from "chart.js/auto";
import "./styles/index.scss";

Chart.register(LinearScale);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DndProvider options={HTML5toTouch}>
      <App />
    </DndProvider>
  </React.StrictMode>
);
