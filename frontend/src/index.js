import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { store } from "./app/store";






const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Provider store= {store}>
  <React.StrictMode>
  <App />
  </React.StrictMode>
  </Provider>
);
