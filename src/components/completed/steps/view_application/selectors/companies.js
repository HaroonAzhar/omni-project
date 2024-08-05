import * as _ from "lodash";

import { getApplication } from "../../../selectors";

const getCompanies = (application) => application?.companies || [];

export const getCompaniesOfApplication = _.flow([getApplication, getCompanies]);
