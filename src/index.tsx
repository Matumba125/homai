import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Index from "app";
import { Provider } from "react-redux";
import store from "app/store/store";
import { initI18N } from "./app/i18next/config";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

async function prepare() {
  initI18N();
}

prepare().then(() => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Index />
      </Provider>
    </React.StrictMode>,
  );
});
