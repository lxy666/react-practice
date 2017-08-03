var path = require("path");
var webpack = require('webpack');
module.exports = {
  entry: { app: ['./app/main.jsx'] },
  output: {
    path: path.resolve(__dirname, "./build"),
    publicPath: "http://127.0.0.1:8080/build/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['','.js','.jsx']
  },
  module: {
    loaders: [
      {test:/\.jsx$/, loaders:['jsx?harmony']}
    ],
    //使用ES6时，才需要添加此节点
    loaders:[
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.resolve(__dirname),
        query: {
          //添加两个预先加载的组件，用来处理js或jsx类型的文件
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  plugins: [
    new webpack.DefinePlugin({
    'process.env.NODE.ENV':"development"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
复制代码