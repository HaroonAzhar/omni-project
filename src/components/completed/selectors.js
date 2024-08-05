import * as _ from "lodash";

export const getApplication = (state) => state.application ?? {};
export const getCase = (state) => state.case ?? {};

const getProperties = (application) => application?.properties ?? [];

export const getPropertiesOfApplication = _.flow([
  getApplication,
  getProperties,
]);
