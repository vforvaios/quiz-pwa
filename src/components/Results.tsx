import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function Results() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const score = state?.score || 0;
  const total = state?.total || 10;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-700 to-indigo-600 px-6 py-10 relative text-white">
      {/* Confetti */}
      <Confetti width={window.innerWidth} height={window.innerHeight} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/20 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center max-w-lg w-full"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold mb-4"
        >
          🏁 Quiz Finished!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl mb-6"
        >
          Your Score:{" "}
          <strong>
            {score} / {total}
          </strong>
        </motion.p>

        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl px-6 py-3 shadow-lg"
            onClick={() => navigate("/game")}
          >
            Play Again
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl px-6 py-3 shadow-lg"
            onClick={() => navigate("/")}
          >
            Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
