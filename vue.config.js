// vue.config.js
const Dotenv = require('dotenv-webpack');

module.exports = {
  // this line added for fixing blank page in index.html
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: '',
        // @import "@/assets/scss/app.scss";
      },
    },
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line
        args[0].title = 'Music App';
        return args;
      });
  },
  // added for using enviroment variables
  configureWebpack: {
    plugins: [
      new Dotenv({ path: './.env.local' }),
    ],
  },
};
