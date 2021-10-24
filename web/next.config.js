const path = require("path");
const { BUCKET_NAME, WEB_CF_DISTRIBUTION_ID } = process.env;

module.exports = {
  reactStrictMode: true,
  // https://www.serverless.com/plugins/serverless-nextjs-plugin
  env: {
    BUCKET_NAME,
    WEB_CF_DISTRIBUTION_ID,
  },
  webpack5: false,
  webpack: (config, options) => {
    // alias 추가
    config.resolve.alias["~"] = path.resolve(__dirname, "src");

    return config;
  },
};
