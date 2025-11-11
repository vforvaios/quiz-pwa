import { Helmet } from "react-helmet-async";

const HelmetHeader = ({ shareUrl }: any) => {
  return (
    // Στο component σου που κάνει share
    <Helmet>
      <title>Quiz Results - Test Your Knowledge</title>
      <meta
        name="description"
        content="Discover how well you did in our exciting quiz! Challenge your friends and see who scores higher."
      />

      {/* Open Graph Tags */}
      <meta property="og:url" content={shareUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Quiz Master - Test Your Knowledge" />
      <meta
        property="og:description"
        content="🎯 Take the ultimate quiz challenge! How many questions can you answer correctly? Play now and share your results!"
      />
      <meta
        property="og:image"
        content="https://quiz-pwa-nine.vercel.app/logo.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Quiz Master" />
      <meta property="og:locale" content="el_GR" />

      {/* Twitter Card (optional) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Quiz Master - Test Your Knowledge" />
      <meta
        name="twitter:description"
        content="🎯 Take the ultimate quiz challenge! Play now and share your results!"
      />
      <meta
        name="twitter:image"
        content="https://quiz-pwa-nine.vercel.app/logo.png"
      />
    </Helmet>
  );
};

export default HelmetHeader;
