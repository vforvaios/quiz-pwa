import { motion } from "framer-motion";

interface IFacebookShareButtonProps {
  shareUrl: string;
}

const FacebookShareButton = ({ shareUrl }: IFacebookShareButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-3 shadow-lg"
      onClick={() => {
        // Χρησιμοποιούμε μόνο το shareUrl - το Facebook θα πάρει τα metadata από τα OG tags
        const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        window.open(fbShareUrl, "_blank", "width=600,height=400");
      }}
    >
      <i className="icon-facebook" /> Share
    </motion.button>
  );
};

export default FacebookShareButton;
