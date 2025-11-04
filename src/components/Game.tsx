import { useEffect, useState } from "react";
import { getQuestions } from "../services/triviaAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedCategory,
  selectedDifficulty,
} from "@/models/selectors/categoriesSelectors";
import { motion } from "framer-motion";
import { setLoading } from "@/models/actions/loaderAction";

export default function Game() {
  const category = useSelector(selectedCategory);
  const difficulty = useSelector(selectedDifficulty);
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchQuestion = async () => {
    dispatch(setLoading(true));
    const questions = await getQuestions(category, difficulty, 5);
    setQuestions(questions);
    dispatch(setLoading(false));
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
    <div className=" flex flex-col items-center justify-center px-6  text-white">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl h-3 bg-lightgreycolor rounded-full mb-8">
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
          className="bg-whitecolor backdrop-blur-md p-6 rounded-2xl shadow-xl w-full text-center"
        >
          <h2 className="text-4xl text-redcolor font-bold mb-5">
            Question {current + 1} / {questions.length}
          </h2>
          <p
            className="text-3xl text-redcolor mb-7"
            dangerouslySetInnerHTML={{ __html: q.question }}
          />

          <div className="flex flex-col gap-4">
            {answers.map((a) => {
              const base =
                "p-4 rounded-xl border font-semibold text-xl text-blackcolor transition-all";
              const color = selected
                ? a === q.correct_answer
                  ? "bg-greencolor text-blackcolor border-greencolor"
                  : a === selected
                    ? "bg-redcolor text-whitecolor border-redcolor"
                    : "bg-lightgreycolor border-whitecolor text-blackcolor"
                : "bg-lightgreycolor border-whitecolor hover:bg-greycolor text-blackcolor";

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
            className={`${selected === q.correct_answer ? "text-greencolor" : "text-redcolor"} mt-6 text-xl font-bold absolute left-[0] right-[0] text-center`}
            style={{ transform: "translateX(-50%)" }}
          >
            {selected === q.correct_answer ? "✅ Correct!" : "❌ Wrong!"}
          </motion.div>
        )}
      </div>
    </div>
  );
}
