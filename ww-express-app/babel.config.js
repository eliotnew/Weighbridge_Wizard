// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current", // This ensures that Babel transpiles only what is necessary for your current version of Node.js
        },
      },
    ],
  ],
};
