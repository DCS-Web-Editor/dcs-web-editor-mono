/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        0.2: "0.2rem",
      },
      colors: {
        primary: "#293949",
        secondary: "#cadad7",
      },
    },
  },
  plugins: [],
};
