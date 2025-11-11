import { Helmet } from "react-helmet-async";

const HelmetHeader = () => {
  return (
    <Helmet>
      {/* Βασικά meta tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>QUIZ FRIENDS - Test Your Knowledge</title>
      <meta
        name="description"
        content="🎯 Take the ultimate quiz challenge! Play now and share your results with friends!"
      />
      <link rel="canonical" href="https://quiz-pwa-nine.vercel.app/" />

      {/* Open Graph Tags - ΠΙΟ ΣΠΕΤΣΙΦΙΚ */}
      <meta property="og:url" content="https://quiz-pwa-nine.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="QUIZ FRIENDS - Test Your Knowledge" />
      <meta
        property="og:description"
        content="🎯 Take the ultimate quiz challenge! Play now and share your results with friends!"
      />
      <meta
        property="og:image"
        content="https://quiz-pwa-nine.vercel.app/quiz-share-image.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="QUIZ FRIENDS" />
      <meta property="og:locale" content="el_GR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="QUIZ FRIENDS - Test Your Knowledge" />
      <meta
        name="twitter:description"
        content="🎯 Take the ultimate quiz challenge! Play now and share your results with friends!"
      />
      <meta
        name="twitter:image"
        content="https://quiz-pwa-nine.vercel.app/quiz-share-image.png"
      />
    </Helmet>
  );
};

export default HelmetHeader;
