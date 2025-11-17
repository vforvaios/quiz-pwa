import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../services/triviaAPI";
import { useDispatch } from "react-redux";
import { setCategory, setDifficulty } from "@/models/actions/categoriesActions";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "./common/Loader";
import { enqueueSnackbar } from "notistack";
import DifficultyModal from "./DifficultyModal";
import { getAdminDifficulties } from "@/services/admin";

export default function Categories() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);

  const handleDifficulty = (difficulty: string) => {
    dispatch(setDifficulty(difficulty));
    navigate("/game");
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: () => getCategories(),
    enabled: true,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const {
    data: difficulties,
    isError: difficultiesIsError,
    error: difficultiesError,
    isLoading: difficultiesIsLoading,
  } = useQuery({
    queryKey: ["get-difficulties"],
    queryFn: getAdminDifficulties,
    enabled: true,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (isError || difficultiesIsError) {
      enqueueSnackbar(error?.toString() || difficultiesError?.toString(), {
        variant: "error",
        autoHideDuration: 4000,
      });
    }
  }, [isError, difficultiesIsError]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ["get-categories"],
      });
      queryClient.removeQueries({
        queryKey: ["get-difficulties"],
      });
    };
  }, [queryClient]);

  if (isLoading) {
    return <Loader show={isLoading || difficultiesIsLoading} />;
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 text-white">
      <DifficultyModal
        difficulties={difficulties?.difficulties}
        open={open}
        setOpen={setOpen}
        handleDifficulty={handleDifficulty}
      />

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl text-whitecolor font-extrabold mb-10 tracking-tight text-center"
      >
        🎯 Επιλογή Κατηγορίας
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-3 max-w-[700px] w-full"
      >
        {data?.trivia_categories?.map((cat: any) => {
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="group text-blackcolor min-h-[100px] bg-lightgreycolor backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:border-white/40  transition-all flex flex-col items-center justify-center text-center space-y-3"
              onClick={() => {
                dispatch(setCategory(cat.id));
                setOpen(true);
              }}
            >
              <span className="text-lg font-semibold text-blackcolor">
                {cat.name}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 text-whitecolor text-sm"
      >
        Tip: Κάλεσε τους φίλους σου και παίξτε μαζί! 🎉
      </motion.p>
    </div>
  );
}
