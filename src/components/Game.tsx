import { useEffect, useState } from "react";
import { getQuestions } from "../services/triviaAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedCategory,
  selectedDifficulty,
} from "@/models/selectors/categoriesSelectors";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "./common/Loader";
import { enqueueSnackbar } from "notistack";
import { ErrorFallback } from "./common/ErrorFallback";
import { useRedirectOnInvalidAccess } from "@/hooks/useNavigateRefresh";
import { setCategory, setDifficulty } from "@/models/actions/categoriesActions";

export default function Game() {
  useRedirectOnInvalidAccess();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const category = useSelector(selectedCategory);
  const difficulty = useSelector(selectedDifficulty);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const {
    data: questions,
    isError,
    error,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["get-questions", category, difficulty],
    queryFn: () => getQuestions(category, difficulty, 5),
    enabled: !!category && !!difficulty,
    refetchOnWindowFocus: false,
    retry: false,
  });

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

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(error.toString(), {
        variant: "error",
        autoHideDuration: 4000,
      });
    }
  }, [isError]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ["get-questions"],
      });
    };
  }, [queryClient]);

  useEffect(() => {
    const handler = () => {
      dispatch(setCategory(null));
      dispatch(setDifficulty(null));
    };

    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [dispatch]);

  if (isError || !category || !difficulty) {
    return <ErrorFallback />;
  }

  if (isLoading || isFetching) {
    return <Loader show={true} />;
  }

  const q = questions?.[current] || [];
  const answers = [...q?.incorrect_answers, q?.correct_answer].sort();

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
          className="bg-whitecolor backdrop-blur-md p-4 rounded-2xl shadow-xl w-full text-center"
        >
          <h2 className="text-3xl md:text-4xl text-redcolor font-bold mb-4">
            Ερώτηση {current + 1} / {questions.length}
          </h2>
          <p
            className="text-xl md:text-3xl text-redcolor mb-4"
            dangerouslySetInnerHTML={{ __html: q.question }}
          />

          <div className="flex flex-col gap-4">
            {answers?.map((a) => {
              const base =
                "p-4 rounded-xl border font-semibold text-sm md:text-xl text-blackcolor transition-all";
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
            {selected === q.correct_answer ? "✅ Σωστό!" : "❌ Λάθος!"}
          </motion.div>
        )}
      </div>
    </div>
  );
}
