import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectedCategory,
  selectedDifficulty,
} from "@/models/selectors/categoriesSelectors";

export function useRedirectOnInvalidAccess() {
  const navigate = useNavigate();
  const category = useSelector(selectedCategory);
  const difficulty = useSelector(selectedDifficulty);

  useEffect(() => {
    if (!category || !difficulty) {
      navigate("/", { replace: true });
    }
  }, [category, difficulty, navigate]);
}
