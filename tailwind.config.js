/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blackcolor: "var(--black-color)",
        redcolor: "var(--red-color)",
      },
    },
  },
  plugins: [],
};
