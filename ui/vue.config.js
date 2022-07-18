module.exports = {
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
