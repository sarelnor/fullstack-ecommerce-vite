/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS, TS, JSX, and TSX files in src directory
  ],
  theme: {
    extend: {
      screens: {
        custom: "1000px", // Custom breakpoint at 1000px
      },
    },
  },
  plugins: [],
};
