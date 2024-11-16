/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ], theme: {
        screens: {
            sm: '640px',
            md: '968px',
            lg: '1424px',
            xl: '1660px',
        },
        important: true,
        extend: {
            colors: {
                white: "#F7F7F3",
                black: "#2A2A2A",
                background: "#F0EDEB",
                bg_card: "#ECE9E7",
                green: "#26BD6C",
                green_ligth: "#97C1A9",
                red: "#CA8787",
                red_1: "#EB6767",

            },
        },
    },
    plugins: [],
}

