import { motion, AnimatePresence } from "framer-motion";
import Modal from "./common/Modal";

export default function DifficultyModal({
  open,
  setOpen,
  handleDifficulty,
}: any) {
  return (
    <AnimatePresence>
      {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 12 }}
            className="relative bg-lightgreycolor rounded-3xl p-8 shadow-lg border-2 border-greycolor text-center"
          >
            {/* Title */}
            <h2 className="text-blackcolor text-3xl font-extrabold mb-2 tracking-tight">
              🕹️ Επιλογή Δυσκολίας
            </h2>
            <p className="text-darkgreycolor mb-8 text-sm font-semibold tracking-wider">
              Παρακαλώ επίλεξε βαθμό δυσκολίας
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              {[
                {
                  label: "ΕΥΚΟΛΟ 😌",
                  color:
                    "bg-greencolor text-white hover:shadow-[0_0_15px_#0fd769aa]",
                  value: "1",
                },
                {
                  label: "ΜΕΤΡΙΟ 😅",
                  color:
                    "bg-greycolor text-blackcolor hover:shadow-[0_0_15px_#bebec1aa]",
                  value: "2",
                },
                {
                  label: "ΔΥΣΚΟΛΟ 😈",
                  color:
                    "bg-redcolor text-white hover:shadow-[0_0_15px_#c6371aaa]",
                  value: "3",
                },
              ].map((level) => (
                <motion.button
                  key={level.value}
                  whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDifficulty(level.value)}
                  className={`px-8 py-3 rounded-2xl font-bold transition-all duration-200 shadow-md active:scale-95 ${level.color}`}
                >
                  {level.label}
                </motion.button>
              ))}
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(false)}
              className="px-5 py-2 rounded-xl font-semibold text-blackcolor bg-greycolor hover:bg-darkgreycolor active:scale-95 transition"
            >
              Κλείσιμο
            </motion.button>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
