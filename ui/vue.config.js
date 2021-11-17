module.exports = {
  devServer: {
    proxy: {
      '/services': {
        target: process.env.SERVICES_URL,
        xfwd: true,
        pathRewrite: { '^/services/': '' },
        autoRewrite: true,
        hostRewrite: true
      }
    }
  },
  pwa: {
    name: 'Five Fifths Voter',
    manifestOptions: {
      short_name: 'fivefifthsvoter',
      start_url: '/',
      theme_color: '#000000'
    }
  }
};
