import axios from "axios";

import { BACKEND_URL } from "utils/urls";
import { unpackInterceptor } from "utils/axios_interceptors";

// TODO: it should be created once per app in container.
const httpClient = axios.create({
  withCredentials: process.env.REACT_APP_REQUIRE_AUTHENTICATION === "true",
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
  },
});

httpClient.interceptors.response.use(unpackInterceptor);

export const register = (Service) => {
  return new Service(httpClient);
};

export class HttpService {
  constructor(client) {
    this.client = client;
  }
}
