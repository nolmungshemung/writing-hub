const path = require('path');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  // https://www.serverless.com/plugins/serverless-nextjs-plugin
  webpack: (config, options) => {
    // alias 추가
    config.resolve.alias['~'] = path.resolve(__dirname, 'src');

    return config;
  },
};
