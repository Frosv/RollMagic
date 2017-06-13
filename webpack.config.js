const path = require('path'); //路径文件
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //输入css文件
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html

const jquery = require('jquery');

const config = {
  // devtool: 'eval',
  entry: './page/index.js', //文件入口
  output: {
    filename: 'js/[name]-[hash:8].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist') //生成地址
  },
  devServer: {
    compress: true, //使用gzip压缩
    port: 9999, //端口号
  },
  module: {
    rules: [{
        test: /\.html$/,
        use: 'dot-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(css|scss)$/, //匹配css
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader!postcss-loader?id=css'
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader?name=static/img/[name]-[hash:8].[ext]'
      },
      {
        test: /\.ttf\??.*$/,
        use: 'file-loader?name=static/fonts/[name]-[hash:8].[ext]&minetype=application/octet-stream'
      },
      {
        test: /\.eot\??.*$/,
        use: 'file-loader?name=static/fonts/[name]-[hash:8].[ext]'
      },
      {
        test: /\.svg\??.*$/,
        use: 'file-loader?name=static/fonts/[name]-[hash:8].[ext]&minetype=image/svg+xml'
      },
      {
        test: /\.(woff|woff2)\??.*$/,
        use: 'file-loader?name=static/fonts/[name]-[hash:8].[ext]&minetype=application/font-woff'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),
    new HtmlWebpackPlugin({ //html注入文件插件
      filename: 'index.html', //文件名
      template: './page/index.html', //渲染模板
      // minify: { //压缩HTML
      //   removeComments: true,
      //   collapseWhitespace: true
      // }
    }),
    new ExtractTextPlugin({
      filename: 'css/[name]-[contenthash:8].css'
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true
    // })//混淆压缩
  ]
};

module.exports = config;
