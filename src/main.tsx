// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import "./tailwind.css";

import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import store from "./store";
let persistor = persistStore(store);

createRoot(document.getElementById("root") as HTMLElement).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </StrictMode>
);
