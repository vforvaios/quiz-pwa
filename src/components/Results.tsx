import { useNavigate } from "react-router-dom";
// import { useGame } from "../context/GameContext";

export default function Results() {
  //   const { score, setScore, setCategory } = useGame();
  const navigate = useNavigate();

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🏁 Quiz Finished!</h1>
      <p className="text-xl mb-6">
        Your Score: <strong>{10}</strong>
      </p>
      <button
        className="bg-indigo-600 text-white rounded-xl p-3 mx-2"
        onClick={() => {
          //   setScore(0);
          navigate("/");
        }}
      >
        Play Again
      </button>
      <button
        className="bg-gray-500 text-white rounded-xl p-3 mx-2"
        onClick={() => {
          //   setScore(0);
          //   setCategory(null);
          navigate("/");
        }}
      >
        Home
      </button>
    </div>
  );
}
