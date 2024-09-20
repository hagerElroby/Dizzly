import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        light: '#F3F3F3',
        DEFAULT: '#0084FF',
        dark: '#1C1B1F',
        gray: '#313131',
        main: '#515DEF',
        second: '#1565D8',
        success:'#FF8682',
        borderColor:'#79747E',
        weakColor:'#8692A6'
      },
      fontFamily: {
        poppins: 'Poppins'
      },
        boxShadow: {
        'custom': '0px 4px 14px 1px rgba(0, 0, 0, 0.07)', // Custom shadow
      },
    },
  },
  plugins: [],
};
export default config;
