import { ApolloProvider } from "@apollo/client";
import { render } from "react-dom";
import { client } from "./apollo";
import React from "react";
import "./styles/styles.css";

import App from "./App";

const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  rootElement
);
