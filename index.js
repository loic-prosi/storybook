// Preset documentation
// https://storybook.js.org/docs/presets/writing-presets/
// https://github.com/storybookjs/presets/tree/master/packages/preset-scss

// Webpack loader wrapper
function wrapLoader(loader, options) {
  if (options === false) {
    return [];
  }

  return [
    {
      loader,
      options
    }
  ];
}

// Wrapper API
function webpack(webpackConfig = {}, options = {}) {
  const { module = {} } = webpackConfig;
  const {
    styleLoaderOptions,
    cssLoaderOptions,
    lessLoaderOptions,
    rule = {}
  } = options;

  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [
        ...(module.rules || []),
        {
          test: /\.less$/,
          ...rule,
          use: [
            ...wrapLoader("style-loader", styleLoaderOptions),
            ...wrapLoader("css-loader", cssLoaderOptions),
            ...wrapLoader("less-loader", lessLoaderOptions)
          ]
        }
      ]
    }
  };
}

// Addons API
function addons(entry = []) {
  return [
    require.resolve("@storybook/addon-essentials"),
    require.resolve("@storybook/addon-links/register")
  ];
}

// Only exports those two APIS, check for documentation for more API endpoints
module.exports = { webpack, addons };
