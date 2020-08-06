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
    require.resolve("@storybook/addon-actions/register"),
    require.resolve("@storybook/addon-links/register"),
    require.resolve("@storybook/addon-a11y/register"),
    require.resolve("@storybook/addon-backgrounds/register"),
    require.resolve("@storybook/addon-info"),
    require.resolve("@storybook/addon-knobs/register"),
    require.resolve("@storybook/addon-notes/register"),
    require.resolve("@storybook/addon-options/register"),
    require.resolve("@storybook/addon-storysource/register"),
    require.resolve("@storybook/addon-viewport/register"),
    require.resolve("@storybook/addon-events/register"),
    require.resolve("@storybook/addon-centered"),
    require.resolve("@storybook/addon-jest/register")
  ];
}

// Only exports those two APIS, check for documentation for more API endpoints
module.exports = { webpack, addons };