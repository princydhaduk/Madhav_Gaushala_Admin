/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
   extend: {
      colors:{
        'primary':'#FC791A',
        'secondary':'#FEFCE8',
        'dark':'#020617',
        'red':'#B01212',
        'gray_1':'#94A3B8',
        'gray_2':'#F1F5F9',
        'slate_1' : '#475569',
        'slate_2' : '#CBD5E1',
      },
      screens: {
        'xs': '450px',
        // => @media (min-width: 450px) { ... }
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
        '4xl': '1750px',
        // => @media (min-width: 1536px) { ... }
      },
      fontSize:{
        '12' : ['12px','18px'],
        '14' : ['14px','20px'], 
        '16' : ['16px','26px'], 
        '18' : ['18px','24px'], 
        '20' : ['20px','28px'],
        '22' : ['22px','30px'],
        '24' : ['24px','32px'], 
        '28' : ['28px','36px'], 
        '30' : ['30px','40px'],
        '32' : ['32px','42px'],
        '36' : ['36px','46px'],
        '48' : ['48px','56px'],
      },
      boxShadow: {
        'custom': '4px 0px 30px 0px rgba(131, 98, 234, 0.05)',
        'custom_2': '0px 2px 16px 0px rgba(2, 6, 23, 0.12)',
        'login_custom': '0px 6px 24px 0px rgba(2, 6, 23, 0.06)'
      }
    },
  },
  plugins: [],
}