// webpack.config.js
const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = (env) => {
const production = env.production;

  return{
    entry: { main: './src/pages/index.js' },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: production 
      ? "scripts/[contenthash].[name].js"
      : "scripts/[name].js",

          publicPath: ''
    },
  // переписали точку выхода, используя утилиту path
  
    mode: 'development',
    devServer: {
      static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
      compress: true, // это ускорит загрузку в режиме разработки
      port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
  
      open: true // сайт будет открываться сам при запуске npm run dev
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html' // путь к файлу index.html
      }),
      new MiniCssExtractPlugin({
        filename: production 
        ? "styles/[contenthash].[name].css"
        : "styles/[name].css",
  }), // подключение плагина для объединения файлов
    ],
  
    module: {
    rules: [
      {
        test: /\.css$/,
  
        use: [production ? MiniCssExtractPlugin.loader : 'style-loader', 
        {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
        'postcss-loader'
      ]
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: "images/[hash][ext][query]"
        }
      },

      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: "fonts/[hash][ext][query]"
        }
      },

      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      }

    ],
  }
  }
} 
