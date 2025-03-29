const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './shared/ts/script.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
        {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
    devServer: {
        static: './dist',
        open: true,
    },
    mode: 'development',
};