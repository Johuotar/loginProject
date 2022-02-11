const path = require('path');

module.exports = {
    entry: ['./server.js', './models/User.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
};