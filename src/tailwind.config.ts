export default {
  theme: {
    extend: {
      keyframes: {
        "pulse-bar": {
          "0%, 100%": { height: "20%" },
          "50%": { height: "100%" },
        },
      },
      animation: {
        "pulse-bar": "pulse-bar 1s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
