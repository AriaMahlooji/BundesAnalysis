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
      fontSize: {
        '2xl': '1.5rem',  // This is the default 'xl' size
        '3xl': '2rem',    // Create a custom size '3xl' with a larger font size
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