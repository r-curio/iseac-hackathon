import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        colors: {
          primary: '#591DA9',
          secondary: {
            DEFAULT: '#051960',
            900: '#00020A',  
            800: '#030D30',  
          },
          accent: {
            100: '#75A3EB', 
            200: '#CB98ED', 
          },
          gray: '#C0B4D0',
          text: '#120622',
          background: {
            light: '#F8F7FC',  
            dark: '#090311',   
          },
          nav: {
            click: "rgba(117, 163, 235, 0.5)", 
            hover: "rgba(117, 163, 235, 0.2)"
          }
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
