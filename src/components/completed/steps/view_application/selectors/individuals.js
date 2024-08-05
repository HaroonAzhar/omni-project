import * as _ from "lodash";

import { getApplication } from "../../../selectors";

const getIndividuals = (application) => application?.individuals || [];

export const getIndividualsOfApplication = _.flow([
  getApplication,
  getIndividuals,
]);
