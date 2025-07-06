module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        oxanium: ["Oxanium", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#2563EB", // Blue-600
          light: "#3B82F6", // Blue-500
          dark: "#1E40AF", // Blue-700
        },
        background: {
          DEFAULT: "#F4F7FA", // Light grayish background
          dark: "#464646",
        },
        border:{
          DEFAULT:"#E5E5E5"
        }

      },
    },
  },
  plugins: [],
};
