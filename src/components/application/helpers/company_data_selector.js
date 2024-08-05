import { createSelector } from "reselect";

import merge_company_data from "./merge_company_data";

const getCompanyData = (state) => state.application.companyData;
const getDipCompanyNumber = (state) => state.application.company_number;
const getDipCompanyName = (state) => state.application.company_name;

export const getCompany = createSelector(
  [getCompanyData, getDipCompanyNumber, getDipCompanyName],
  (companyData, companyNumber, companyName) => {
    if (!companyData) {
      return {};
    }
    return merge_company_data({ ...companyData, companyNumber, companyName });
  }
);
