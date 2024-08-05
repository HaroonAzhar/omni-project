import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { COMPANIES_HOUSE_URL } from "utils/urls";

import chDetailsResponse from "./responses/ch_details_response.json";
import chOfficersResponse from "./responses/ch_officers_response.json";

export default ({
  chDetailsCalled = jest.fn(() => {}),
  chOfficersCalled = jest.fn(() => {}),
} = {}) => {
  const detailsUrl = `${COMPANIES_HOUSE_URL}/company/.*`;
  const detailsRegex = new RegExp(detailsUrl);
  const mockAdapter = new MockAdapter(axios);

  mockAdapter.onGet(detailsRegex).reply((config) => {
    if (config.url.includes("officers")) {
      chOfficersCalled();
      return [200, chOfficersResponse];
    }

    chDetailsCalled();
    return [200, chDetailsResponse];
  });
};
