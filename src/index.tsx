import { ApolloProvider } from "@apollo/client";
import { render } from "react-dom";
import { client } from "./apollo";
import React from "react";
import "./styles/styles.css";

import App from "./components/App";
import { HelmetProvider } from "react-helmet-async";

const rootElement = document.getElementById("root");
render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ApolloProvider>,
  // </React.StrictMode>,
  rootElement
);
