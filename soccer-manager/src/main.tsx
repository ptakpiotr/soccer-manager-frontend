import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Chart, LinearScale } from "chart.js/auto";
import "./styles/index.scss";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

Chart.register(LinearScale);

const client = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 20,
    },
  },
});

export const gqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://localhost:7047/graphql/",
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={gqlClient}>
      <QueryClientProvider client={client}>
        <DndProvider options={HTML5toTouch}>
          <App />
        </DndProvider>
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>
);
