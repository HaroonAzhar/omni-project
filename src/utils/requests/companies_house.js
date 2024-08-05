import axios from "axios";

import { COMPANIES_HOUSE_URL } from "utils/urls";
const { REACT_APP_COMPANIES_HOUSE_USERNAME } = process.env;

export const handleCompaniesHouse = ({ companyName, startIndex, perPage }) => {
  return axios.get(`${COMPANIES_HOUSE_URL}/search/companies`, {
    params: {
      q: companyName,
      items_per_page: perPage,
      start_index: startIndex,
    },
    auth: {
      username: REACT_APP_COMPANIES_HOUSE_USERNAME,
      password: "",
    },
  });
};

export const getCompanyOfficers = (company_number) => {
  return axios.get(
    `${COMPANIES_HOUSE_URL}/company/${company_number}/officers`,
    {
      auth: {
        username: REACT_APP_COMPANIES_HOUSE_USERNAME,
        password: "",
      },
    }
  );
};
export const getCompanyDetails = (company_number) => {
  return axios.get(`${COMPANIES_HOUSE_URL}/company/${company_number}`, {
    auth: {
      username: REACT_APP_COMPANIES_HOUSE_USERNAME,
      password: "",
    },
  });
};
