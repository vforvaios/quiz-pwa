import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../services/triviaAPI";
import { useDispatch } from "react-redux";
import { setCategory, setDifficulty } from "@/models/actions/categoriesActions";
import { motion } from "framer-motion";
import Modal from "./common/Modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "./common/Loader";
import { enqueueSnackbar } from "notistack";

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
        queryKey: ["get-categories"],
      });
    };
  }, [queryClient]);

  if (isLoading) {
    return <Loader show={isLoading} />;
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 text-white">
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 className="text-blackcolor text-2xl font-semibold mb-3 tracking-tight">
          Difficulty Selection
        </h2>
        <p className="text-darkgreycolor mb-6 text-sm uppercase font-medium tracking-wide">
          Please select a difficulty mode for your game
        </p>

        <div className="flex gap-3 justify-center mb-6">
          <button
            className="px-5 py-2.5 rounded-lg font-semibold text-white transition 
                 bg-greencolor hover:brightness-110 active:scale-95 shadow"
            onClick={() => handleDifficulty("easy")}
          >
            EASY
          </button>
          <button
            className="px-5 py-2.5 rounded-lg font-semibold text-blackcolor transition 
                 bg-greycolor hover:bg-darkgreycolor active:scale-95 shadow"
            onClick={() => handleDifficulty("medium")}
          >
            MEDIUM
          </button>
          <button
            className="px-5 py-2.5 rounded-lg font-semibold text-white transition 
                 bg-redcolor hover:brightness-110 active:scale-95 shadow"
            onClick={() => handleDifficulty("hard")}
          >
            HARD
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg font-medium text-blackcolor bg-lightgreycolor 
                 hover:bg-greycolor active:scale-95 transition"
          >
            Close
          </button>
        </div>
      </Modal>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl text-whitecolor font-extrabold mb-10 tracking-tight text-center"
      >
        🎯 Choose Your Quiz Category
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-3 max-w-[700px] w-full"
      >
        {data.map((cat: any) => {
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
        Tip: Invite friends and play together for more fun! 🎉
      </motion.p>
    </div>
  );
}
