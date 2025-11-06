import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// 🎮 Example player data (replace with real data later)
const players = [
  { name: "Alice", score: 980 },
  { name: "Bob", score: 870 },
  { name: "Charlie", score: 820 },
  { name: "Diana", score: 780 },
  { name: "Ethan", score: 720 },
  { name: "Fiona", score: 690 },
  { name: "George", score: 640 },
  { name: "You", score: 760 }, // 👈 current player
];

const LeaderBoard = () => {
  const navigate = useNavigate();

  // Sort players by score (highest first)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const maxScore = sortedPlayers[0].score;

  // Find current player’s rank
  const currentPlayer = players.find((p) => p.name === "You");
  const yourRank =
    sortedPlayers.findIndex((p) => p.name === currentPlayer?.name) + 1;

  const yourAvatar = `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(
    currentPlayer?.name as string
  )}`;

  return (
    <div className=" flex flex-col items-center px-6 text-white">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-10 text-center"
      >
        🏆 Βαθμολογία
      </motion.h1>

      {/* Leaderboard Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 w-full max-w-[550px]"
      >
        {/* Header Row */}
        <div className="grid grid-cols-[0.8fr_2.5fr_1fr] text-sm font-semibold text-white/70 border-b border-white/20 pb-2 mb-4">
          <span className="text-left">Θέση</span>
          <span className="text-center">Παίχτης</span>
          <span className="text-right">Σκορ</span>
        </div>

        {/* Player Rows */}
        {sortedPlayers.map((player, index) => {
          const barWidth = (player.score / maxScore) * 100;
          const avatarUrl = `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(
            player.name
          )}`;

          return (
            <motion.div
              key={player.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`relative grid grid-cols-[0.8fr_2.5fr_1fr] items-center mb-3 px-3 py-2 rounded-xl overflow-hidden
                ${
                  player.name === "You"
                    ? "ring-2 ring-white/50 bg-redcolor/40"
                    : index === 0
                      ? "text-yellow-300 font-bold"
                      : index === 1
                        ? "text-gray-100"
                        : index === 2
                          ? "text-orange-200"
                          : "text-white"
                }`}
            >
              {/* Animated score bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${barWidth}%` }}
                transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                className={`absolute left-0 top-0 h-full ${
                  index === 0
                    ? "bg-yellow-400/20"
                    : index === 1
                      ? "bg-gray-400/10"
                      : index === 2
                        ? "bg-orange-400/10"
                        : "bg-white/5"
                } rounded-xl`}
              />

              {/* Rank */}
              <span className="z-10 text-left font-semibold">#{index + 1}</span>

              {/* Player + Avatar */}
              <div className="z-10 flex items-center justify-center gap-3">
                <img
                  src={avatarUrl}
                  alt={`${player.name}'s avatar`}
                  className="w-8 h-8 rounded-full border border-white/20"
                />
                <span className="font-semibold truncate">{player.name}</span>
              </div>

              {/* Score */}
              <span className="z-10 text-right font-semibold">
                {player.score}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Your Rank Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-4 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-5 w-full max-w-[400px] text-center border border-white/10"
      >
        <div className="flex flex-col items-center space-y-3">
          <img
            src={yourAvatar}
            alt="Your avatar"
            className="w-16 h-16 rounded-full border-2 border-white/40"
          />
          <h3 className="text-xl font-bold">Εσύ</h3>
          <p className="text-white/80">Θέση #{yourRank}</p>
          <p className="text-lg font-semibold text-white">
            Σκορ: {currentPlayer?.score}
          </p>
        </div>
      </motion.div>

      {/* Back to Home */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => navigate("/")}
        className="mt-10 bg-white text-redcolor font-bold px-8 py-3 rounded-2xl hover:bg-redcolor hover:text-white transition-all duration-300"
      >
        Αρχική
      </motion.button>
    </div>
  );
};

export default LeaderBoard;
