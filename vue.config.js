// vue.config.js
module.exports = {
  // this line added for fixing blank page in index.html
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',

  css: { loaderOptions: { scss: { additionalData: '@import "@/assets/scss/main.scss";' } } },

  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line
        args[0].title = 'Apple Music';
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
  pwa: {
    name: 'Apple Music',
    theme: '#fa233b',
    manifestOptions: { short_name: 'Music' },
  },
};
