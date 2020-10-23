const path = require('path')

module.exports = {
  dev: {

    //Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/text': {
        target: 'http://10.1.7.132:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/test': '/test'
        }
      }
    },
  }
}
