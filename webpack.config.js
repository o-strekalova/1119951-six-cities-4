const path = require(`path`);

module.exports = {
  entry: `./src/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: false,
    inline: true,
    port: 1334,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }, {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`
      }
    ],
  },
  devtool: `source-map`,
  resolve: {
    extensions: [`.ts`, `.tsx`, `.js`, `json`]
  },
};
