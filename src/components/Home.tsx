import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PlayButton from "./common/PlayButton";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-130px)] flex flex-col items-center justify-center text-white px-6 text-center">
      {/* Hero Title */}

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-6xl font-extrabold tracking-tight"
      >
        🎯 Το καλύτερο Quiz ever!
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-white/80 text-md md:text-lg mt-4 max-w-[600px]"
      >
        Τσέκαρε τις γνώσεις σου, παίξε με φίλους, και δες ποιος είναι ο απόλυτος
        Quizάς!
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
      >
        {/* Start Quiz */}

        <PlayButton onClick={() => navigate("/categories")} />

        {/* Login */}
        <button
          onClick={() => navigate("/login")}
          className="border-2 border-white text-white font-semibold text-lg px-8 py-4 rounded-2xl hover:bg-white hover:text-redcolor transition-all duration-300"
        >
          Σύνδεση
        </button>

        {/* 🔥 NEW Register Button */}
        <button
          onClick={() => navigate("/register")}
          className="border-2 border-redcolor bg-redcolor text-white font-semibold text-lg px-8 py-4 rounded-2xl hover:bg-white hover:text-redcolor transition-all duration-300"
        >
          Εγγραφή
        </button>
      </motion.div>

      {/* Footer Tip */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-sm text-white/70"
      >
        🔥 Tip: Παίξε καθημερινά και κέρδισε πόντους!
      </motion.p>
    </div>
  );
}
