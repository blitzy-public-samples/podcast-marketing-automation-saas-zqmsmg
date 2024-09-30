const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();

  return {
    ...defaultConfig,
    transformer: {
      ...defaultConfig.transformer,
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      ...defaultConfig.resolver,
      sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'],
    },
  };
})();

// Human tasks:
// TODO: Review and adjust Metro configuration based on project-specific needs
// TODO: Consider adding custom transformer options if needed