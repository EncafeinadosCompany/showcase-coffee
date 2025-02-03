/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
  theme: {
	extend: {
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
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
			DEFAULT: "hsl(var(--accent))",
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
		  brown: {
			900: "#4B2E2E", // Espresso
			800: "#5C3D31",
			600: "#8B5E3B", // Mocha
		  },
		  amber: {
			100: "#FAE3B0", // Latte
			200: "#F8D9A2",
		  },
		  yellow: {
			600: "#D4A017", // Caramelo
			500: "#E8B923",
			400: "#F5C45A",
		  },
		  orange: {
			700: "#C26A37", // Macchiato
			600: "#D27B49",
		  }
		},
		borderRadius: {
		  lg: `var(--radius)`,
		  md: `calc(var(--radius) - 2px)`,
		  sm: "calc(var(--radius) - 4px)",
		},
	  },
  },
  plugins: [require("tailwindcss-animate")],
}

