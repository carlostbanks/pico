// config-overrides.js
module.exports = function override(config, env) {
    // Override Webpack configuration to include polyfills
    config.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        zlib: require.resolve('browserify-zlib'),
        url: require.resolve('url/')
    };

    // For Webpack 5, you may need to install and use the plugin for providing polyfills
    const webpack = require('webpack');
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ]);

    return config;
};
