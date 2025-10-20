import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCategories } from "../services/triviaAPI";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setCategory } from "@/models/actions/categoriesActions";
import { allCategories } from "@/models/selectors/categoriesSelectors";
import { motion } from "framer-motion";

export default function Home() {
  const dispatch = useDispatch();
  const categories = useSelector(allCategories);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((res) => dispatch(setCategories(res)));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex flex-col items-center justify-center px-6 py-10 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-extrabold mb-10 tracking-tight text-center"
      >
        🎯 Choose Your Quiz Category
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl w-full"
      >
        {categories.map((cat: any, i: number) => {
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:border-white/40 hover:bg-white/20 shadow-lg transition-all flex flex-col items-center justify-center text-center space-y-3"
              onClick={() => {
                dispatch(setCategory(cat.id));
                navigate("/game");
              }}
            >
              <span className="text-lg font-semibold group-hover:text-yellow-300">
                {cat.name}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-white/80 text-sm"
      >
        Tip: Invite friends and play together for more fun! 🎉
      </motion.p>
    </div>
  );
}
