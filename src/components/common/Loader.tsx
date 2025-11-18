import { useEffect, useMemo, useState } from "react";

interface ILoaderProps {
  show: boolean;
}

const Loader = ({ show }: ILoaderProps) => {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    "Σκέφτεσαι σαν ένας πραγματικός quiz master!",
    "Τα δεδομένα φορτώνονται... μην βιάζεσαι!",
    "Κάθε σωστή απάντηση μετράει!",
    "Η γνώση είναι δύναμη!",
    "Έτοιμος για την επόμενη πρόκληση;",
    "Ο εγκέφαλός σου γυμνάζεται!",
    "Καλή επιτυχία!",
    "Τα λέμε στην κορυφή του scoreboard!",
  ];

  // Shuffle only when component mounts or tips change
  const shuffledTips = useMemo(() => {
    return [...tips].sort(() => Math.random() - 0.5);
  }, []); // Empty dependency array = shuffle once

  useEffect(() => {
    if (!show) return;

    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [show, shuffledTips]);

  if (!show) return null;

  return (
    <div className="fixed px-4 inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col items-center p-8 bg-white/10 rounded-2xl shadow-2xl border border-white/20">
        {/* Animated Quiz Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <span className="text-2xl font-bold text-gray-800">?</span>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
        </div>

        {/* Rotating Tips */}
        <div className="h-12 mb-4 flex items-center">
          <p className="text-white text-center text-lg font-medium transition-opacity duration-500">
            {shuffledTips[currentTip]}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex space-x-2">
          {shuffledTips.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTip ? "bg-yellow-400 scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
