import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCategories } from "../services/triviaAPI";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setCategory } from "@/models/actions/categoriesActions";
import { allCategories } from "@/models/selectors/categoriesSelectors";

export default function Home() {
  const dispatch = useDispatch();
  const categories = useSelector(allCategories);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((res) => dispatch(setCategories(res)));
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">🎯 Choose a Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map((cat: any) => (
          <button
            key={cat.id}
            className="bg-indigo-600 text-white rounded-xl p-3 hover:bg-indigo-700 transition"
            onClick={() => {
              dispatch(setCategory(cat.id));
              navigate("/game");
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
