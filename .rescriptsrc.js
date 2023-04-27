const {
  appendWebpackPlugin,
} = require('@rescripts/utilities')
const path = require('path');

const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = config => {
  const workboxConfigProd = {
    swSrc: path.resolve(__dirname, './src/service-worker.ts'),
    swDest: 'service-worker.js',
    exclude: [/\.map$/, /asset-manifest\.json$/, /service-worker\.js$/],
  }
  const appended = appendWebpackPlugin(
    new InjectManifest(workboxConfigProd),
    config,
  )
  return appended
}

//https://github.com/harrysolovay/rescripts/blob/master/packages/examples/editing-webpack-plugins/.rescriptsrc.js