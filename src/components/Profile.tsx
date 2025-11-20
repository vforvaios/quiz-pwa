import { logoutUser } from "@/models/actions/loginActions";
import { userLoggedIn } from "@/models/selectors/loginSelectors";
import { getUserProfile } from "@/services/triviaAPI";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorFallback } from "./common/ErrorFallback";
import { Trophy, Play, LogOut, Star, Award, Target } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector(userLoggedIn);

  const {
    data: userProfile,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserProfile(loggedUser.userId, loggedUser.token),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // TEMP EXAMPLE DATA — replace with real user state
  const user = {
    name: "Alex Player",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Alex",
    gamesPlayed: 42,
    highScore: 18700,
    rank: 12,
    level: 7,
    correctAnswers: 156,
    streak: 8,
  };

  if (isError) {
    return <ErrorFallback />;
  }

  // Calculate level progress (example)
  const levelProgress = 65;

  return (
    <div className="min-h-screen py-8 px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-[450px] mx-auto border border-white/20 shadow-2xl relative overflow-hidden"
      >
        {/* Decorative quiz elements */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-green-400/20 rounded-full blur-xl"></div>

        {/* Level Badge */}
        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-blackcolor px-4 py-2 rounded-full font-bold text-sm shadow-lg">
          Level {user.level}
        </div>

        {/* Avatar with pulse animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mx-auto w-32 h-32"
        >
          <motion.img
            src={user.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
          {/* Online status indicator */}
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-greencolor rounded-full border-2 border-white"></div>
        </motion.div>

        {/* Name and Title */}
        <div className="text-center mt-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-greycolor bg-clip-text text-transparent">
            {userProfile?.profile?.name || user.name}
          </h2>
          <p className="text-lightgreycolor mt-1">{loggedUser.email}</p>

          {/* Streak Indicator */}
          <div className="inline-flex items-center gap-1 bg-redcolor/30 px-3 py-1 rounded-full mt-2 text-sm">
            <Target className="w-4 h-4" />
            <span>Στρικ {user.streak} ημερών! 🔥</span>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Πρόοδος Level</span>
            <span>{levelProgress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ delay: 0.5, duration: 1 }}
              className="bg-gradient-to-r from-greencolor to-easycolor h-3 rounded-full shadow-lg shadow-greencolor/30"
            />
          </div>
        </div>

        {/* Stats Section - More game-like */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 text-center relative"
          >
            <div className="w-10 h-10 bg-redcolor/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold">
              {userProfile?.profile?.totalGames || user.gamesPlayed}
            </p>
            <p className="text-xs text-lightgreycolor">Παιχνίδια</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 text-center relative"
          >
            <div className="w-10 h-10 bg-greencolor/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-5 h-5 text-greencolor" />
            </div>
            <p className="text-2xl font-bold">
              {userProfile?.profile?.totalScore || user.highScore}
            </p>
            <p className="text-xs text-lightgreycolor">Σκορ</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 text-center relative"
          >
            <div className="w-10 h-10 bg-blue-400/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold">#{user.rank}</p>
            <p className="text-xs text-lightgreycolor">Θέση</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 text-center relative"
          >
            <div className="w-10 h-10 bg-purple-400/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold">{user.correctAnswers}</p>
            <p className="text-xs text-lightgreycolor">Σωστές Απαντήσεις</p>
          </motion.div>
        </div>

        {/* Achievements Preview */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Επιτεύγματα</h3>
          <div className="flex gap-2">
            {["🏆", "⭐", "🚀", "🎯", "💡"].map((emoji, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl border border-white/20"
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/leaderboard")}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-blackcolor font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-yellow-400/30 transition-all flex items-center justify-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            Δες την Βαθμολογία
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/categories")}
            className="w-full bg-gradient-to-r from-greencolor to-easycolor text-whitecolor font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-greencolor/30 transition-all flex items-center justify-center gap-2 border border-white/20"
          >
            <Play className="w-5 h-5" />
            Παίξε Τώρα!
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-redcolor to-redcolor/80 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-redcolor/30 transition-all flex items-center justify-center gap-2"
            onClick={() => {
              dispatch(logoutUser());
            }}
          >
            <LogOut className="w-5 h-5" />
            Αποσύνδεση
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
