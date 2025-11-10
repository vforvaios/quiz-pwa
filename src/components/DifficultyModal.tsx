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
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.6,
            }}
            className="relative bg-lightgreycolor rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-whitecolor text-center overflow-hidden max-w-sm sm:max-w-md mx-auto"
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-greencolor via-greycolor to-redcolor"></div>

            {/* Floating emojis */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity },
              }}
              className="absolute -top-2 -left-2 text-2xl sm:text-3xl"
            >
              🎮
            </motion.div>

            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-1 -right-1 text-xl sm:text-2xl"
            >
              ⭐
            </motion.div>

            {/* Title with animation */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <h2 className="text-blackcolor text-2xl sm:text-3xl font-black mb-2 tracking-tight">
                🕹️ Επιλογή Δυσκολίας
              </h2>
              <motion.p
                className="text-darkgreycolor mb-2 text-xs sm:text-sm font-bold tracking-wider"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Παρακαλώ επίλεξε βαθμό δυσκολίας!
              </motion.p>
            </motion.div>

            {/* Buttons Container - Vertical on mobile */}
            <motion.div
              className="flex flex-col gap-3 sm:gap-4 justify-center mb-6 sm:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, staggerChildren: 0.1 }}
            >
              {[
                {
                  label: "ΕΥΚΟΛΟ 😌",
                  color: "bg-greencolor text-whitecolor",
                  shadow: "hover:shadow-[0_8px_20px_-5px_rgba(15,215,105,0.4)]",
                  value: "1",
                  emoji: "🌟",
                },
                {
                  label: "ΜΕΤΡΙΟ 😅",
                  color: "bg-greycolor text-blackcolor",
                  shadow:
                    "hover:shadow-[0_8px_20px_-5px_rgba(229,232,226,0.4)]",
                  value: "2",
                  emoji: "⚡",
                },
                {
                  label: "ΔΥΣΚΟΛΟ 😈",
                  color: "bg-redcolor text-whitecolor",
                  shadow: "hover:shadow-[0_8px_20px_-5px_rgba(198,55,26,0.4)]",
                  value: "3",
                  emoji: "💀",
                },
              ].map((level, index) => (
                <motion.div
                  key={level.value}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { type: "spring", stiffness: 400 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <motion.button
                    onClick={() => handleDifficulty(level.value)}
                    className={`relative w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl font-bold sm:font-extrabold transition-all duration-300 shadow-lg active:scale-95 ${level.color} ${level.shadow} group overflow-hidden text-sm sm:text-base border-2 border-whitecolor`}
                    whileHover={{
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
                    }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-whitecolor/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    <span className="relative flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                        className="text-lg sm:text-xl"
                      >
                        {level.emoji}
                      </motion.span>
                      {level.label}
                    </span>
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>

            {/* Close Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "var(--dark-grey-color)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(false)}
                className="px-5 py-2.5 rounded-lg font-bold text-blackcolor bg-greycolor hover:bg-darkgreycolor active:scale-95 transition-all duration-200 border-2 border-whitecolor shadow-md text-sm sm:text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  Κλείσιμο
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="text-sm"
                  >
                    ✨
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>

            {/* Confetti particles background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-lg sm:text-xl"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    y: [0, -80, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  {["🎯", "🎪", "🎨", "🧩", "🎲", "🎭"][i]}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
