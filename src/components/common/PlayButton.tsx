import { motion } from "framer-motion";

const PlayButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0.9, opacity: 1 }}
      animate={{ scale: [1, 1.08, 1], opacity: 1 }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{
        scale: 1.12,
        boxShadow: "0 0 20px rgba(255,255,255,0.7)",
        transition: { duration: 0.1 },
      }}
      className="relative bg-white text-redcolor font-bold text-xl px-10 py-5 rounded-2xl shadow-lg 
      hover:bg-redcolor hover:text-white transition-all"
    >
      🎯 Start Quiz
      {/* Sparkles / Emoji burst */}
      <motion.span
        className="absolute -top-4 -right-4 text-2xl select-none"
        animate={{ y: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        ✨
      </motion.span>
      <motion.span
        className="absolute -bottom-4 -left-4 text-2xl select-none"
        animate={{ y: [5, -5, 5] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      >
        🔥
      </motion.span>
    </motion.button>
  );
};

export default PlayButton;
