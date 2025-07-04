import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#591DA9",
        secondary: {
          "800": "#030D30",
          "900": "#00020A",
          DEFAULT: "#051960",
        },
        accent: {
          "100": "#75A3EB",
          "200": "#CB98ED",
        },
        gray: "#C0B4D0",
        text: "#120622",
        background: {
          light: "#F8F7FC",
          dark: "#090311",
        },
        nav: {
          click: "rgba(117, 163, 235, 0.5)",
          hover: "rgba(117, 163, 235, 0.2)",
          border: "rgba(226, 232, 240, 0.10)",
        },
      },
      backgroundImage: {
        "gradient-nav-active":
          "linear-gradient(180deg, rgba(229, 204, 246, 0.6) 0%, rgba(203, 152, 237, 0.6) 32%, rgba(89, 29, 169, 0.6) 100%)",
        "gradient-1":
          "linear-gradient(180deg, #e5ccf6 0%, #CB98ED 32%, #591DA9 100%)",
        "gradient-2":
          "linear-gradient(139deg, rgba(89, 29, 169, 0.20) -6.39%, rgba(5, 25, 96, 0.00) 112.17%)",
        "flashcard-gradient":
          "linear-gradient(139deg, var(--Primary, rgba(89, 29, 169, 0.70)) -6.39%, rgba(5, 25, 96, 0.00) 112.17%)",
        "flashcard-background-gradient":
          "linear-gradient(180deg, var(--P7, #120622) 0%, var(--S8, #00020A) 100%)",
        "result-gradient":
          "radial-gradient(circle at center, #241A4C 0%, #09031C 90%, #00020A)",
        "text-gradient":
          "linear-gradient(294deg, rgba(255, 255, 255, 0.00) -10.68%, #FFF 103.67%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
