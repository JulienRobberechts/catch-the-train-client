const { name, version } = require("../package.json");

const config = {
  APPLICATION_NAME: name,
  APPLICATION_VERSION: version,
  ENVIRONMENT: process.env.NODE_ENV,
  SERVER_ROOT_URL:
    process.env.REACT_APP_SERVER_ROOT_URL || "http://localhost:3000",
  PORT: process.env.PORT || "3025",
  CLIENT_URL: window.location.href
};

module.exports = config;
