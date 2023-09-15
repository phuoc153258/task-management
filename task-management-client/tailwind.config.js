/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
    theme: {
        extend: {
            colors: {
                'purple-color': '#350a4e',
                'primary-color': '#fa9e1b',
                'white-color': '#fff',
                'violet-color': '#8d4fff',
                'yellow-color': '#fa9e1b',
                'black-color': '#2d2c2c',
                'btn-black-color': '#31124b',
                'header-color': 'rgba(54, 19, 84, 0.6)',
                'header-scroll-color': 'rgba(54, 19, 84, 0.85)',
                'offer-color': '#eda84a',
                'gray-italic-color': '#929191',
            },
            keyframes: {
                changeNavbar: {
                    from: { padding: '40px 0px 70px 0px' },
                    to: { padding: '40px 0px 40px 0px' },
                },
            },
            animation: {
                'change-navbar-animation': 'changeNavbar 1s ease forwards',
                'hover-button-animation': 'all 400ms ease',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
