/** @type {import('tailwindcss').Config} */
import aspectratio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [aspectratio, forms],
};
