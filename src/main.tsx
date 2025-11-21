// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import "./styles/colors.scss";
import "./index.css";
import "./styles/modal.scss";
import "./styles/admin.scss";
import "./styles/table.scss";
import "@/fontello/css/fontello.css";
import "./tailwind.css";

import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import store from "./store";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/my-worker.js", { type: "module" })
      .then((registration) => {
        console.log("SW registered:", registration);

        // Check if a SW is waiting
        if (registration.waiting) {
          window.dispatchEvent(
            new CustomEvent("swUpdate", { detail: registration })
          );
        }

        registration.addEventListener("updatefound", () => {
          const newSW = registration.installing;
          if (!newSW) return;

          newSW.addEventListener("statechange", () => {
            if (newSW.state === "installed" && registration.waiting) {
              window.dispatchEvent(
                new CustomEvent("swUpdate", { detail: registration })
              );
            }
          });
        });
      });
  });
}

let persistor = persistStore(store);

// document.addEventListener("visibilitychange", function () {
//   if (document.visibilityState === "visible") {
//     console.log("APP resumed");
//     window.location.reload();
//   }
// });

createRoot(document.getElementById("root") as HTMLElement).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </StrictMode>
);
