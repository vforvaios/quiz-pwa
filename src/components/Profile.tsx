import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  // TEMP EXAMPLE DATA — replace with real user state
  const user = {
    name: "Alex Player",
    email: "alex@example.com",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Alex",
    gamesPlayed: 42,
    highScore: 18700,
    rank: 12,
  };

  return (
    <div className="justify-center flex items-center px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-[450px] shadow-2xl"
      >
        {/* Avatar */}
        <motion.img
          src={user.avatar}
          alt="User Avatar"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg"
        />

        {/* Name */}
        <h2 className="text-3xl font-bold text-center mt-4">{user.name}</h2>
        <p className="text-blackcolor/60 text-center">{user.email}</p>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          <div className="p-3 bg-white/10 rounded-xl">
            <p className="text-2xl font-bold">{user.gamesPlayed}</p>
            <p className="text-xs text-black/70">Παιχνίδα</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl">
            <p className="text-2xl font-bold">{user.highScore}</p>
            <p className="text-xs text-black/70">Ψηλότερο Σκορ</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl">
            <p className="text-2xl font-bold">#{user.rank}</p>
            <p className="text-xs text-black/70">Γενική Θέση</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-10 space-y-4">
          <button
            onClick={() => navigate("/leaderboard")}
            className="w-full bg-white text-redcolor font-semibold py-3 rounded-xl hover:bg-redcolor hover:text-white transition-all"
          >
            Δες την βαθμολογία
          </button>

          <button
            onClick={() => navigate("/categories")}
            className="w-full border-2 border-white text-darkgreycolor bg-redcolor font-semibold py-3 rounded-xl hover:bg-whitecolor hover:text-blackcolor transition-all"
          >
            Παίξε ξανά
          </button>

          <button
            className="w-full bg-redcolor/80 text-white font-semibold py-3 rounded-xl hover:bg-redcolor transition-all"
            onClick={() => {
              // TODO: clear auth cookie / redux / context
              navigate("/login");
            }}
          >
            Αποσύνδεση
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
