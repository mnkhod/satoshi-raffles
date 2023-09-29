/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                lightGray: '#737373',
                darkerLightGray: '#424242',
                lighterGray: '#D6D6D6',
                lighterDarkGray: '#232323',
                darkGray: '#202020',
                defaultGray: '#292929',
            },
            fontSize: {
                xs: ['10px', '12px'],
                sm: ['12px', '16px'],
                md: ['14px', '18px'],
                lg: ['16px', '24px'],
                xl: ['20px', '28px'],
                '2xl': ['24px', '36px'],
                '4xl': ['40px', '54px'],
                '6xl': ['64px', '64px'],
            },
        },
    },
    plugins: [],
}
