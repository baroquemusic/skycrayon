const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = 'style-loader';

const config = {
    entry: {
        main: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: '[name][ext]',
        clean: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        port: 5000,
        open: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'SkyCrayon Demo Flight',
            template: path.resolve(__dirname, 'src/template.html'),
            favicon: 'src/assets/favicon.ico'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(ico|glb|webp|exr|eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif)$/i,
                type: 'asset',
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
