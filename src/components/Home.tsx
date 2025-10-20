import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../services/triviaAPI";
// import { useGame } from "../context/GameContext";

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  //   const { setCategory } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">🎯 Choose a Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="bg-indigo-600 text-white rounded-xl p-3 hover:bg-indigo-700 transition"
            onClick={() => {
              //   setCategory(cat.id);
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
