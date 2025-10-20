import { /*useEffect, */ useState } from "react";
// import { useGame } from "../context/GameContext";
// import { getQuestions } from "../services/triviaAPI";
import { useNavigate } from "react-router-dom";

export default function Game() {
  //   const { category, score, setScore } = useGame();
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!category) return navigate("/");
  //     getQuestions(category, 5).then(setQuestions);
  //   }, [category]);

  if (!questions.length)
    return <div className="p-6 text-center">Loading...</div>;

  const q = questions[current];
  const answers = [...q.incorrect_answers, q.correct_answer].sort();

  function handleAnswer(answer: string) {
    setSelected(answer);
    // if (answer === q.correct_answer) setScore(score + 1);

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        navigate("/results");
      }
    }, 800);
  }

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-4">
        Question {current + 1} / {questions.length}
      </h2>
      <p
        className="text-lg mb-6"
        dangerouslySetInnerHTML={{ __html: q.question }}
      />
      <div className="grid grid-cols-2 gap-3">
        {answers.map((a) => (
          <button
            key={a}
            className={`p-3 rounded-xl border transition ${
              selected
                ? a === q.correct_answer
                  ? "bg-green-500 text-white"
                  : a === selected
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                : "bg-white hover:bg-indigo-100"
            }`}
            onClick={() => !selected && handleAnswer(a)}
            dangerouslySetInnerHTML={{ __html: a }}
          />
        ))}
      </div>
    </div>
  );
}
