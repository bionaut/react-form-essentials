module.exports = {
  entry: './example/example.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
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