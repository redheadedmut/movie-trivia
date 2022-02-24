import "./boot.js";
import getNodeEnv from "./config/getNodeEnv.js";
import getDatabaseUrl from "./config/getDatabaseUrl.cjs";

export default {
  nodeEnv: getNodeEnv(),
  session: { secret: process.env.SESSION_SECRET },
  IMBD_KEY: process.env.IMBD_KEY,
  databaseUrl: getDatabaseUrl(getNodeEnv()),
  web: { host: process.env.HOST || "0.0.0.0", port: process.env.PORT || 3000 }
};
