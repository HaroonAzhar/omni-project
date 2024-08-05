import Rollbar from "rollbar";

import { IS_DEVELOPMENT, IS_TESTING, ENVIRONMENT } from "./env";

function rollbarInit() {
  if (IS_DEVELOPMENT || IS_TESTING) {
    // use console.logs instead rollbar in development

    /* eslint-disable no-console */
    return {
      info(...args) {
        console.log("As rollbar:", args);
      },
      error(...args) {
        console.error("As rollbar:", args);
      },
      warning(...args) {
        console.error("As rollbar:", args);
      },
      debug(...args) {
        console.error("As rollbar:", args);
      },
    };
    /* eslint-enable no-console */
  }

  // use rollbar if staging or production
  return new Rollbar({
    accessToken: process.env.REACT_APP_ROLLBAR_CLIENT_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    addErrorContext: true,
    payload: {
      environment: ENVIRONMENT,
    },
    ignoredMessages: ["cancelled by axios"],
  });
}

export default rollbarInit();
