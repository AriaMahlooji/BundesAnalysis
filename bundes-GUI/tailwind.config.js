/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: ['responsive', 'fractional'],
      fontSize: {
        '2xl': '1.5rem',  
        '3xl': '2rem',    
        '9xl': '6rem',
        '15xl': '10rem',
        '30xl': '20rem'  
      },
      colors: 
      {
        golden: '#FFD700',
        silver: '#C0C0C0',
        bronze: '#CD7F32'
      }},
  },
  plugins: [],
}