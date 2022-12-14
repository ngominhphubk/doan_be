const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    entry: {
        server: './server.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                // Dịch từ ES6 sang ES5
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};
