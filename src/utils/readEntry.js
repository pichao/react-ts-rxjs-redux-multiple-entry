const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const getEntryFilesInfo = (entryPath) => {
    const obj = {
        entry: {},
        plugins: [],
    };
    fs.readdirSync(entryPath).forEach((file) => {
        const pattern = /\.{1}[a-z]{1,}$/;
        const entryKey = file.slice(0, pattern.exec(file).index);
        obj.entry[`_${entryKey}`] = ['@babel/polyfill', path.join(entryPath, file)];
        obj.plugins.push(
            new HtmlWebpackPlugin({
                // favicon:'',
                filename: `${entryKey}.html`,
                template: path.resolve(__dirname, '../template/index.html'),
                chunks: [`_${entryKey}`],
            }),
        );
    });
    return obj;
};

module.exports = getEntryFilesInfo;
