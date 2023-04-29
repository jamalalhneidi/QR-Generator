/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/flowbite-react/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("flowbite/plugin")
    ],
}