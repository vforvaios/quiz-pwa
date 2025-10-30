import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../services/triviaAPI";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setCategory } from "@/models/actions/categoriesActions";
import { allCategories } from "@/models/selectors/categoriesSelectors";
import { motion } from "framer-motion";
import Modal from "./common/Modal";

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(allCategories);
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    getCategories().then((res) => dispatch(setCategories(res)));
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-white">
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Open Modal
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-semibold mb-3">Springy Modal 🪩</h2>
        <p className="text-gray-600 mb-4">
          Click outside or press <kbd>ESC</kbd> to close. The background blur
          appears instantly — and the popup has a spring animation!
        </p>
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </Modal>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl text-redcolor font-extrabold mb-10 tracking-tight text-center"
      >
        🎯 Choose Your Quiz Category
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-3 max-w-[700px] w-full"
      >
        {categories.map((cat: any) => {
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="group text-blackcolor min-h-[100px] bg-lightgreycolor backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:border-white/40  transition-all flex flex-col items-center justify-center text-center space-y-3"
              onClick={() => {
                dispatch(setCategory(cat.id));
                navigate("/game");
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
        className="mt-12 text-redcolor text-sm"
      >
        Tip: Invite friends and play together for more fun! 🎉
      </motion.p>
    </div>
  );
}
