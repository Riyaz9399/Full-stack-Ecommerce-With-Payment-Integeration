module.exports = function override(config, env) {
    // Add the fallback for crypto
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false,
    };
    return config;
  };
  