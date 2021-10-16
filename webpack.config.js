const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
var ZipPlugin = require('zip-webpack-plugin')
module.exports = {
  devtool: 'source-map',
  entry: {
    pipelineData: './source/pipelineData',
    options: './source/options'
  },
  output: {
    path: path.join(__dirname, 'distribution'),
    filename: '[name].js'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: 'source',
          globOptions: { ignore: ['*.js'] }
        },
        {
          from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js'
        }]
    }
    ),
    new ZipPlugin({ filename: 'gitlab-pipeline-data.zip' })
  ]
}
