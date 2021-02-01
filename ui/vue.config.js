module.exports = {
  devServer: {
    proxy: {
      '/services': {
        target: process.env.SERVICES_URL,
        xfwd: true,
        pathRewrite: { '^/services/': '' },
        autoRewrite: true,
        hostRewrite: true,
      },
    },
  },
}
