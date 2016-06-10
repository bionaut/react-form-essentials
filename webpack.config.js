module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/index.js'
  },
  externals: {
    "react": "react",
    "react-dom": "react-dom",
    "material-ui": "material-ui",
    "react-tap-event-plugin": "react-tap-event-plugin"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      }
    ]
  },
  devServer: {
    port: 3000,
    contentBase: './example',
    inline: true,
    progress: true
  }
};