export const APP_URL = window.location.hostname;

export const ENVIRONMENTS = {
  TEST: "testing",
  DEV: "development",
  STAGE: "staging",
  PROD: "production",
  OMNI: "omni",
};

export const ENVIRONMENT = getEnvironment();
export const IS_TESTING = ENVIRONMENT === ENVIRONMENTS.TEST;
export const IS_DEVELOPMENT = ENVIRONMENT === ENVIRONMENTS.DEV;
export const IS_STAGING = ENVIRONMENT === ENVIRONMENTS.STAGE;
export const IS_PRODUCTION = ENVIRONMENT === ENVIRONMENTS.PROD;

function getEnvironment() {
  if (process.env.NODE_ENV === "testing") return ENVIRONMENTS.TEST;
  if (APP_URL.includes("app")) return ENVIRONMENTS.PROD;
  if (APP_URL.includes("stage.app")) return ENVIRONMENTS.STAGE;
  return ENVIRONMENTS.DEV;
}
