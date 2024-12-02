const HtmlWebpackPlugin = require('html-webpack-plugin'); //membuat bundle index.html
const CopyWebpackPlugin = require('copy-webpack-plugin'); //mengcopy aset ke folder dist
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  entry:{
    app: path.resolve(__dirname, 'src/scripts/index.js'),
    sw: path.resolve(__dirname, 'src/scripts/sw.js'), //supaya service worker ikut terbundle
  },
  output:{
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename:'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns:[
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    //registrasi workbox menggunakan tools workbox generateSW
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js', //nama berkas sw hasil dari bundling nanti

      //supaya request cache terlihat di inspect application
      runtimeCaching:[
        {
          urlPattern: ({ url }) => url.href.startsWith('https://api.themoviedb.org/3/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'themoviedb-api',
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith('https://image.tmdb.org/t/p/w500/'),
          handler: 'StaleWhileRevalidate',
          options:{
            cacheName: 'themoviedb-image-api',
          }
        }
      ]
    }),
  ],
};
