const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { modules: { localIdentName: '[name]__[local]___[hash:base64:5]' } } },
                    { loader: 'sass-loader' },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".scss"],
    },
    plugins: [
        new HtmlWebpackPlugin({template: "./src/index.html",}),
    ],
    devServer: {
        hot: true,
        static: './public',
        port: 8080,
    },
};
