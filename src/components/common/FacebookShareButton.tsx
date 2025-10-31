import { motion } from "framer-motion";

interface IFacebookShareButtonProps {
  shareUrl: string;
  score: string | number;
  total: string | number;
}

const FacebookShareButton = ({
  shareUrl,
  score,
  total,
}: IFacebookShareButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-3 shadow-lg"
      onClick={() => {
        const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}&quote=${encodeURIComponent(
          `I scored ${score}/${total} in this quiz! Can you beat me?`
        )}`;
        window.open(fbShareUrl, "_blank", "width=600,height=400");
      }}
    >
      <i className="icon-facebook" /> Share
    </motion.button>
  );
};

export default FacebookShareButton;
