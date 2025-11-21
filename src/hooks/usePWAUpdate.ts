import { useEffect, useState, useCallback } from "react";

export const usePWAUpdate = () => {
  const [showReload, setShowReload] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateServiceWorker = useCallback(() => {
    if (isUpdating) return;

    setIsUpdating(true);
    console.log("Starting update process...");

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.waiting) {
          // Στείλε μήνυμα να γίνει activate
          registration.waiting.postMessage({ type: "SKIP_WAITING" });

          // Περίμενε λίγο και μετά reload
          setTimeout(() => {
            window.location.reload();
          }, 300);
        }
      });
    }
  }, [isUpdating]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      let registration: ServiceWorkerRegistration;

      const wb = navigator.serviceWorker;

      // Καταχώρηση service worker
      wb.register("/my-worker.ts")
        .then((reg) => {
          registration = reg;
          console.log("Service worker registered");

          // Έλεγγος για updates
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && wb.controller) {
                  // Βρέθηκε νέο service worker - εμφάνισε prompt
                  console.log("New service worker found, showing prompt");
                  setShowReload(true);
                }
              });
            }
          });

          // Έλεγγος αν υπάρχει ήδη waiting worker
          if (reg.waiting && wb.controller) {
            console.log("Waiting service worker found");
            setShowReload(true);
          }
        })
        .catch((error) => {
          console.error("Service worker registration failed:", error);
        });

      // Listen για controller change (όταν ο νέος worker πάρει έλεγχο)
      const handleControllerChange = () => {
        console.log("Controller changed, new service worker activated");
        // Μην κάνεις auto-reload εδώ - άφησε το prompt να το χειριστεί
      };

      wb.addEventListener("controllerchange", handleControllerChange);

      return () => {
        wb.removeEventListener("controllerchange", handleControllerChange);
      };
    }
  }, []);

  return { showReload, updateServiceWorker, isUpdating };
};
