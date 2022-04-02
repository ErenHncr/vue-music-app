// vue.config.js
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

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },
};
