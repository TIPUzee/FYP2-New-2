/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}', './node_modules/tw-elements/dist/js/**/*.js'],
    theme: {
        extend: {
            colors: {
                'primary-400': '#a3c3da',
                'primary-100': '#eef8ff',
                'primary-200': '#77c5fd',
                'primary-300': '#85a5cc',
                dark: '#313a41',
            },
            backgroundImage: {
                'gradient-primary-300': 'linear-gradient(90deg, rgba(0,58,255,1) 0%, rgba(43,165,247,1) 100%)',
                'gradient-secondary-300': 'linear-gradient(90deg, rgba(40,203,27,1) 0%, rgba(21,207,100,1) 100%)',
                'gradient-dark-300': 'linear-gradient(90deg, rgba(2,5,15,1) 0%, rgba(49,57,63,1) 100%)',
                'gradient-dark-100': 'linear-gradient(90deg, rgba(7,4,1,0.34337062461703427) 0%, rgba(49,57,63,0.09687202517725846) 100%)',
                'gradient-green-100': 'linear-gradient(90deg, rgba(111,255,123,1) 0%, rgba(144,255,126,1) 100%)',
                'gradient-red-100': 'linear-gradient(90deg, rgba(254,86,70,1) 0%, rgba(255,146,126,1) 100%)',
            },
        },
    },
    plugins: [require('tw-elements/dist/plugin.cjs')],
    darkMode: 'class',
};
