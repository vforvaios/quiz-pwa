import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-redcolor to-blackcolor flex flex-col items-center justify-center text-white px-6 text-center">
      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold tracking-tight"
      >
        🎯 Ultimate Quiz Challenge
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-white/80 text-lg mt-4 max-w-[600px]"
      >
        Test your knowledge, challenge your friends, and see who’s the ultimate
        quiz master!
      </motion.p>

      {/* Start Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onClick={() => navigate("/categories")}
        className="mt-10 bg-white text-redcolor font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:bg-blackcolor hover:text-white transition-all duration-300"
      >
        Start Quiz
      </motion.button>

      {/* Footer Tip */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-sm text-white/70"
      >
        🔥 Tip: Play daily to earn streak bonuses!
      </motion.p>
    </div>
  );
}
