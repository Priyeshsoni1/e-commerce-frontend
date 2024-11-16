/** @type {import('tailwindcss').Config} */
import aspectratio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
  },
  plugins: [aspectratio, forms],
};
