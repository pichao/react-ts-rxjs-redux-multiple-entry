const commenConfigFunc = require('./webpack.common.config.js');
module.exports = (env, argv) => {
    console.log(env, 'env');
    console.log(argv, 'argv');
    const commenConfig = commenConfigFunc(env, argv);
    return {
        ...commenConfig,

        mode: 'development',
        devtool: 'source-map',

        devServer: {
            compress: true,
            port: 9001,
            historyApiFallback: true, // 开发环境防治路由404
            proxy: {
                '/api': {
                    target: 'https://api.github.com/users',
                    changeOrigin: true,
                    http2: true,
                    pathRewrite: { '^/api': '' },
                    // secure: false,
                },
            },
        },
    };
};
