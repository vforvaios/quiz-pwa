import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { socket } from "@/services/socket";

export default function Lobby() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const inviteLink = `${window.location.origin}/join/${roomId}`;

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("player-joined", () => {
      navigate("/game");
    });

    return () => {
      socket.off("player-joined");
    };
  }, [roomId, navigate]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-130px)] flex flex-col items-center justify-center text-white px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-extrabold mb-6"
      >
        👥 Περιμένουμε τον φίλο σου...
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white/80 mb-4"
      >
        Στείλε αυτό το link:
      </motion.p>

      {/* Invite Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white text-black px-4 py-3 rounded-xl flex items-center gap-3 max-w-[600px] w-full"
      >
        <span className="font-mono text-sm break-all flex-1">{inviteLink}</span>

        <button
          onClick={handleCopy}
          className="bg-redcolor text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
        >
          {copied ? "✅ Copied" : "📋 Copy"}
        </button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 text-sm text-white/60"
      >
        Μόλις μπει ο φίλος σου, το quiz ξεκινάει αυτόματα 🚀
      </motion.p>
    </div>
  );
}
