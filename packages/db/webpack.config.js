// webpack.config.js
const path = require('path')

module.exports = {
    target: 'node',
    entry: './migrate.js',
    output: {
        filename: 'migrate.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // Additional configuration goes here
}
