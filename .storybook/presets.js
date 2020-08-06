const path = require("path");

module.exports = [
  {
    name: "@storybook/storybook",
    options: {
      lessLoaderOptions: {
        lessOptions: {
          noIeCompat: true,
          javascriptEnabled: true
        }
      }
    },
    include: path.resolve(__dirname, "../src")
  }
];
