import { motion } from "framer-motion";

const FacebookShareButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="text-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-3 shadow-lg flex items-center gap-2"
      onClick={() => {
        // Χρησιμοποιούμε απλά το current URL χωρίς parameters
        const shareUrl = "https://quiz-pwa-nine.vercel.app/";
        const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(fbShareUrl, "_blank", "width=600,height=400");
      }}
    >
      <span style={{ display: "block" }} className="text-center">
        <i className="icon-facebook" /> Share on Facebook
      </span>
    </motion.button>
  );
};

export default FacebookShareButton;
