import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "3xl": "1700px",
      },
    },
    extend: {
      fontFamily: {
        myFontFamily: ["Japanese-3017"],
        "japanese-3017": ["Japanese-3017", "sans-serif"],
      },
      colors: {
        danger: {
          50: "#FEF2F2",
          300: "#FCA5A5",
          600: "#DC2626",
          700: "#7F1D1D ",
          800: "#B91C1C",
        },
        base: {
          black: "#1A281F",
          gray: "#666666",
        },
        // Neutrals
        neutral: {
          50: "#F6F6F6",
          100: "#E9E9E9 ",
          300: "#CCCCCC ",
          500: "#A1A1A1 ",
        },
        // TC BLUE
        tc_blue: {
          50: "#EAF4FE",
          100: "#DCE8F4",
          600: "#064A92",
          900: "#053B75 ",
        },
        // BLUE
        blue: {
          50: "#EAF7FD",
          300: "#A9DFF5",
          600: "#28AEE7",
          900: "#10465C",
        },
        // GREEN
        green: {
          50: "#ECFDF5",
          300: "#6EE7B7",
          600: "#059669",
          900: "#064E3B",
        },
        // YELLOW (WARNING)
        yellow: {
          50: "#FFFBEB",
          300: "#FCD34D",
          600: "#D97706",
          900: "#78350F",
        },
        // CYAN (iNFO)
        cyan: {
          50: "#ECFEFF",
          300: "#67E8F9",
          600: "#0891B2",
          900: "#164E63",
        },
        // warning
        warning: {
          50: "#FFFBEB",
          600: "#D97706",
          700: "#78350F",
        },

        // shadcn
        border_color: "rgba(2, 30, 58, 0.10)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#28AEE7",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#DCF763",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      boxShadow: {
        box_shadow: "0px 13px 16px #0000000F",
        home_button: "0px 10px 3px #00000029",
        home_feature_numbering: "0px 13px 10px #00000055",
        home_feature_image: "0px 3px 6px #00000029",
        home_tech_section_btn:
          "inset 0px 3px 6px #00000014, 0px 3px 6px #00000029",
        arrow_shadow: "inset 0px 3px 6px #00000012",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      // backgroudImage
      // backgroundImage: {
      //   AuthenticationBackgroundSvg:
      //     "url(`./src/components/ui/svg/authenticationBackgroundSvg.svg `)",
      // },
    },
  },
  plugins: [require("tailwindcss-animate")],
  corePlugins: {
    fontFamily: true,
  },
} satisfies Config;

export default config;
