import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useNavigationType() {
  const location = useLocation();
  const [isDirectEntry, setIsDirectEntry] = useState(false);

  useEffect(() => {
    const wasNavigated = sessionStorage.getItem("react-router-navigation");

    if (!wasNavigated) {
      // meaning user loaded page directly / refresh
      setIsDirectEntry(true);
    }

    // mark all future navigations as SPA navigations
    sessionStorage.setItem("react-router-navigation", "true");
  }, [location.pathname]);

  return isDirectEntry; // true only when page was NOT reached by navigate()
}
