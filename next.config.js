const path = require("path");

module.exports = {
  reactStrictMode: true,
  // https://www.serverless.com/plugins/serverless-nextjs-plugin
  webpack5: false,
  webpack: (config, options) => {
    // alias 추가
    config.resolve.alias["~"] = path.resolve(__dirname, "src");

    return config;
  },
};
