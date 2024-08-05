import MockAdapter from "axios-mock-adapter";

import { APPLICANT_OF_CASE, APPLICATION_OF_CASE } from "utils/urls";
import { apiAxiosInstance } from "utils/requests/api";

import applicantResponse from "./responses/applicant_response.json";
import applicationResponse from "./responses/application_response.json";

const { id } = applicationResponse.data;

export default ({
  getApplicantCalled = jest.fn(() => {}),
  getApplicationCalled = jest.fn(() => {}),
  saveCalled = jest.fn(() => {}),
} = {}) => {
  const mockedAxios = new MockAdapter(apiAxiosInstance);

  mockedAxios.onGet(APPLICANT_OF_CASE(id)).reply(() => {
    getApplicantCalled();
    return [200, applicantResponse];
  });

  mockedAxios.onGet(APPLICATION_OF_CASE(id)).reply(() => {
    getApplicationCalled();
    return [200, applicationResponse];
  });

  mockedAxios.onPost(APPLICANT_OF_CASE(id)).reply((config) => {
    saveCalled(config);
    return [200, { data: { id } }];
  });
};
