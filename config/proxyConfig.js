module.exports = {
  proxy: {
    '/api': {
      target: 'https://www.easy-mock.com/mock/5d03540aeac61a6b1d2bed00/example',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api':'/'
      }
    }
  }
}
