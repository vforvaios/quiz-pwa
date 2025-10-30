import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IModalProps {
  open: boolean;
  children?: React.ReactNode;
  message?: string;
  onClose: () => void;
}

export default function Modal({ open, onClose, children }: IModalProps) {
  // 🧠 Close on ESC key
  useEffect(() => {
    const handleEsc = (e: any) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          // Clicking outside closes modal
          onClick={onClose}
        >
          {/* 🩵 Static overlay (no animation lag) */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* 🪟 Animated modal box */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", damping: 20, stiffness: 300 },
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
              transition: { duration: 0.15 },
            }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl 
                       border border-white/30 backdrop-blur-xl p-8"
          >
            {/* ❌ Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
