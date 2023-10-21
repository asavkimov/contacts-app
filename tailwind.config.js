module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: '#21675e',
        'green-light': '#a6c2be',
        blue: '#847fff',
        'blue-light': '#d1cfff',
        yellow: '#ffff93',
        'yellow-dark': '#333314',
      },
    },
  },
  plugins: [require('kutty')],
};
