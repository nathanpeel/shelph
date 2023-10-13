import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'curerntColor',
        sky: '#079CEF',
        green: '#11985F',
        pink: '#FF9CEF',
        orange: '#FF7246',
        midnight: '#020737',
        black: '#100E1F',
        white: '#FBFBFB',
        yellow: '#F1F678',
        strawberry: '#FC7E7E',
        violet: '#150D75',
        gray: '#D9D9D9'
      },
    },
  },
  plugins: [],
}
export default config
