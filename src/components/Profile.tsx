import { logoutUser } from "@/models/actions/loginActions";
import { userLoggedIn } from "@/models/selectors/loginSelectors";
import { getUserProfile } from "@/services/triviaAPI";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorFallback } from "./common/ErrorFallback";
import { enqueueSnackbar } from "notistack";
import Loader from "./common/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector(userLoggedIn);

  const {
    data: userProfile,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserProfile(loggedUser.userId, loggedUser.token),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // TEMP EXAMPLE DATA
  const user = {
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Alex",
    rank: 12,
  };

  if (isFetching) {
    return <Loader show={isFetching} />;
  }

  if (isError) {
    enqueueSnackbar(error?.toString(), {
      variant: "error",
      autoHideDuration: 4000,
    });
    return <ErrorFallback />;
  }

  return (
    <div className="min-h-screen py-8 px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 w-full max-w-[400px] mx-auto border border-white/10 shadow-xl"
      >
        {/* Avatar */}
        <div className="relative mx-auto w-24 h-24">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-white shadow-md"
          />
        </div>

        {/* Name and Info */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-white">
            {userProfile?.profile?.name}
          </h2>
          <p className="text-greycolor mt-1 text-sm">{loggedUser.email}</p>
        </div>

        {/* Stats Grid - Simplified */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
            <div className="text-yellow-400 text-lg mb-1">🏆</div>
            <p className="text-xl font-bold">
              {userProfile?.profile?.totalGames}
            </p>
            <p className="text-xs text-greycolor">Παιχνίδια</p>
          </div>

          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
            <div className="text-greencolor text-lg mb-1">⭐</div>
            <p className="text-xl font-bold">
              {userProfile?.profile?.totalScore}
            </p>
            <p className="text-xs text-greycolor">Σκορ</p>
          </div>

          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
            <div className="text-blue-400 text-lg mb-1">📊</div>
            <p className="text-xl font-bold">#{user.rank}</p>
            <p className="text-xs text-greycolor">Θέση</p>
          </div>
        </div>

        {/* Action Buttons - No complex animations */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate("/leaderboard")}
            className="w-full bg-redcolor text-white font-semibold py-3 rounded-xl hover:bg-redcolor/90 transition-colors flex items-center justify-center gap-2"
          >
            <span>🏆</span>
            Βαθμολογία
          </button>

          <button
            onClick={() => navigate("/categories")}
            className="w-full bg-greencolor text-white font-semibold py-3 rounded-xl hover:bg-greencolor/90 transition-colors flex items-center justify-center gap-2 border border-white/20"
          >
            <span>🎮</span>
            Παίξε Τώρα
          </button>

          <button
            className="w-full bg-white/10 text-white font-semibold py-3 rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            onClick={() => {
              dispatch(logoutUser());
            }}
          >
            <span>🚪</span>
            Αποσύνδεση
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
