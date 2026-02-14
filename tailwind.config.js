/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./App.jsx",
        "./main.jsx",
    ],
    theme: {
        extend: {
            colors: {
                slate: '#4a6161',
                mist: '#8a9a9a',
                sandstone: '#a69d93',
                oatmeal: '#f2f2ef',
                paper: '#fafaf9',
                pebble: '#e0e0dc',
                obsidian: '#3d4242',
                smoke: '#8c9191',
                sage: '#8e9e94',
                blush: '#b59393',
            }
        },
    },
    plugins: [],
}
