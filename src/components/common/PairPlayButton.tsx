import { motion } from "framer-motion";

type Props = {
  onClick: () => void;
};

export default function PairPlayButton({ onClick }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="border-2 border-white text-white font-semibold text-lg px-8 py-4 rounded-2xl hover:bg-white hover:text-redcolor transition-all duration-300"
    >
      👥 Παίξε με φίλο
    </motion.button>
  );
}
