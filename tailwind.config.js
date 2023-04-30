const {createThemes} = require("tw-colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': {
                    DEFAULT: '#569EA4',
                    dark: '#467379'
                },
                'secondary': {
                    DEFAULT: '#72565F'
                },
            }
        },
    },
    plugins: [
        createThemes({
            light: {
                'light': '#E7EBE2',
                'dark': '#141720',
            },
            dark: {},
        })
    ],
}