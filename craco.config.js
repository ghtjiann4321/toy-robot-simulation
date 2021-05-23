const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/app/components'),
      '@typings': path.resolve(__dirname, 'src/app/types'),
      '@utils': path.resolve(__dirname, 'src/app/utils'),
      '@constants': path.resolve(__dirname, 'src/app/constants'),
    },
  },
};