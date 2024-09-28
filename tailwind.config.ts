import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      screens: {
        sm: '640px',
        md: '768px',
        custom: '850px', 
        lg: '1024px', 
        xl: '1280px',
     },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        light: '#F3F3F3',
        DEFAULT: '#0084FF',
        dark: '#1C1B1F',
        gray: '#313131',
        main: '#700C18',
        second: 'rgb(238 226 228)',
        success:'#FF8682',
        borderColor:'#79747E',
        weakColor:'#8692A6',
        lightRed:'#FF8682'
      },
       fontFamily: {
        poppins: 'Poppins'
      },
        boxShadow: {
        'custom': '0px 4px 14px 1px rgba(0, 0, 0, 0.07)',
      },
    },
  },
  plugins: [],
};
export default config;
