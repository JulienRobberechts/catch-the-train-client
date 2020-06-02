// const { name, version } = require("../package.json");
import { name, version } from "../package.json";

export interface AppConfig {
  APPLICATION_NAME: string;
  APPLICATION_VERSION: string;
  ENVIRONMENT: string;
  SERVER_ROOT_URL: string;
  PORT: string;
  CLIENT_URL: string;
  MOCK_TIME: boolean;
  DISABLE_TIME_UPDATE: boolean;
  MAPBOX_ACCESS_TOKEN?: string;
}

const config: AppConfig = {
  APPLICATION_NAME: name,
  APPLICATION_VERSION: version,
  ENVIRONMENT: process.env.NODE_ENV,
  SERVER_ROOT_URL:
    process.env.REACT_APP_SERVER_ROOT_URL || "http://localhost:3000",
  PORT: process.env.PORT || "3025",
  CLIENT_URL: window.location.href,
  MOCK_TIME: process.env.REACT_APP_MOCK_TIME === "true",
  DISABLE_TIME_UPDATE: process.env.REACT_APP_DISABLE_TIME_UPDATE === "true",
  MAPBOX_ACCESS_TOKEN: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
};

export default config;
// module.exports = config;
