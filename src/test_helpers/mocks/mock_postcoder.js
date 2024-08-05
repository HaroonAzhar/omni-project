import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { POSTCODER_URL } from "utils/urls";

import postcoderResponse from "./responses/postcoder_response.json";

export default ({ getPostcoderAddress = jest.fn(() => {}) } = {}) => {
  const mockAdapter = new MockAdapter(axios);

  const getPostcoderAddressResponse = jest.fn((config) => {
    getPostcoderAddress(config);
    return [200, postcoderResponse];
  });

  const url = new RegExp(`${POSTCODER_URL}/*`);
  mockAdapter.onGet(url).reply(getPostcoderAddressResponse);
};
