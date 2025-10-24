import { useEffect, useState } from "react";
import { getQuestions } from "../services/triviaAPI";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectedCategory } from "@/models/selectors/categoriesSelectors";
import { motion } from "framer-motion";

export default function Game() {
  const category = useSelector(selectedCategory);
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const fetchQuestion = async () => {
    const questions = await getQuestions(category, 5);
    setQuestions(questions);
  };

  useEffect(() => {
    if (!category) {
      navigate("/");
      return;
    }
    fetchQuestion();
  }, [category, navigate]);

  if (!questions?.length)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );

  const q = questions[current];
  const answers = [...q.incorrect_answers, q.correct_answer].sort();

  function handleAnswer(answer: string) {
    setSelected(answer);
    if (answer === q.correct_answer) setScore(score + 1);

    setTimeout(() => {
      if (current + 1 < questions?.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        navigate("/results", { state: { score, total: questions.length } });
      }
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-[#c6371a] flex flex-col items-center justify-center px-6 py-10 text-white">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl h-3 bg-white/20 rounded-full mb-8">
        <div
          className="h-3 bg-yellow-400 rounded-full transition-all"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="relative pb-8 max-w-2xl w-full">
        {/* Question Card */}
        <motion.div
          key={q.question}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full text-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            Question {current + 1} / {questions.length}
          </h2>
          <p
            className="text-lg mb-6"
            dangerouslySetInnerHTML={{ __html: q.question }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {answers.map((a) => {
              const base = "p-4 rounded-xl border font-semibold transition-all";
              const color = selected
                ? a === q.correct_answer
                  ? "bg-green-500 text-white border-green-600"
                  : a === selected
                    ? "bg-red-500 text-white border-red-600"
                    : "bg-white/30 border-white/50 text-white"
                : "bg-white/10 border-white/30 hover:bg-white/20 text-white";

              return (
                <motion.button
                  key={a}
                  className={`${base} ${color}`}
                  onClick={() => !selected && handleAnswer(a)}
                  whileHover={{ scale: selected ? 1 : 1.03 }}
                  whileTap={{ scale: selected ? 1 : 0.97 }}
                  dangerouslySetInnerHTML={{ __html: a }}
                />
              );
            })}
          </div>
        </motion.div>
        {/* Score Display */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-xl font-bold absolute left-[0] right-[0] text-center"
            style={{ transform: "translateX(-50%)" }}
          >
            {selected === q.correct_answer ? "✅ Correct!" : "❌ Wrong!"}
          </motion.div>
        )}
      </div>
    </div>
  );
}
