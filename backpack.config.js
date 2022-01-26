const path = require("path");
const nodeExternals = require("webpack-node-externals");

// Backpack.config.js
module.exports = {
  webpack: config => {
    // Perform customizations to config
    config.resolve.alias = {
      src: path.resolve(__dirname, "src"),
    };

    config.target = "node";
    config.externals = [nodeExternals()];

    // Add support for MJS files
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto"
    });

    // Important: return the modified config
    return config;
  }
};
