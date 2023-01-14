const path = require('path');
module.exports = {
  chainWebpack: (config) => {
    config.module.rule('svg').exclude.add(path.resolve(__dirname, '.'));

    config.module
      .rule('app-svgs')
      .test(/\.(svg)(\?.*)?$/)
      .include.add(path.resolve(__dirname, '.'))
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-cheap-source-map',
    devServer: {
      watchOptions: {
        ignored: ['**/node_modules', '**/src/assets', '**/test'],
      },
    },
  },
  devServer: {
    proxy: {
      '/services': {
        target: `http://localhost:${process.env.SERVICES_PORT || 3333}/`,
        xfwd: true,
        pathRewrite: { '^/services/': '' },
        autoRewrite: true,
        hostRewrite: true,
      },
    },
    watchOptions: {
      poll: true,
    },
    hot: true,
  },
  pwa: process.env.PWA
    ? {
        name: 'Five Fifths Voter',
        manifestOptions: {
          short_name: 'fivefifthsvoter',
          start_url: '/',
          theme_color: '#000000',
        },
      }
    : undefined,
};
