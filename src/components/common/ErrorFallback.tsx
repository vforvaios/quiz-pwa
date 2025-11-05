import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const ErrorFallback = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="text-7xl mb-4"
      >
        💥
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl font-extrabold text-redcolor"
      >
        Oops! Something Went Wrong
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 text-lg mt-3 max-w-md"
      >
        Don't worry — it’s not you, it’s us. Try refreshing the page or come
        back later!
      </motion.p>

      {/* Refresh Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={() => navigate("/")}
        className="mt-6 bg-redcolor text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-blackcolor transition-all duration-300"
      >
        Back to Home
      </motion.button>
    </div>
  );
};
