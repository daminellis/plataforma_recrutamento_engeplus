import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "auth" : "linear-gradient(180deg, rgba(4, 26, 60, 0.45) 0%, rgba(4, 26, 60, 0.90) 100%), url('/static/images/background/Engeplus.jpg');"
      }
    },
  },
  plugins: [],
};
export default config;
