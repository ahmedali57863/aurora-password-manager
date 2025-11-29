/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        magnode: ['Magnode', 'sans-serif'],
        jumbotron: ['"Jumbotron"', 'sans-serif'],
        bhlingglers: ['"Bhlingglers"', 'cursive'],
        orbitron: ['"Orbitron"', 'sans-serif'],
        treeghost: ['"Tree Ghost"', 'cursive'],
        rebornes: ['"Rebornes"', 'serif'],
        brshape: ['"BR Shape"', 'sans-serif'],
        Simple: ['"ASimpleLife"', 'sans-serif'],
        Abellaice: ['"Abellaice"', 'sans-serif'],
        Badonk: ['"Badonk A Donk"', 'sans-serif'],
        Mollen: ['"Mollen Crispy"', 'sans-serif'],
        brokeren: ['"Brokeren Miring"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
