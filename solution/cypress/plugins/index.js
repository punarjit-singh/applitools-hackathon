module.exports = (on, config) => {
  return mergeCypressConfig();

  function mergeCypressConfig() {
    const env = process.env.CYPRESS_ENV;
    const envConfig = require("../../cypress." + env + ".json");

    return Object.assign(config, envConfig);
  }
};


require('@applitools/eyes-cypress')(module);
