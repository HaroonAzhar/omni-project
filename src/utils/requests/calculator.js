import axios from "axios";

import {
  CALCULATOR_END_OF_MONTH,
  CALCULATOR_STATEMENT,
  CALCULATOR_URL,
  CALCULATOR_WATERFALL,
} from "utils/urls";

import { withTokenInterceptor, unpackInterceptor } from "../axios_interceptors";

const calculatorAxiosInstance = axios.create();
calculatorAxiosInstance.interceptors.request.use(withTokenInterceptor);
calculatorAxiosInstance.interceptors.response.use(unpackInterceptor);

export const calculator = (data, options) => {
  return calculatorAxiosInstance.post(CALCULATOR_URL, data, options);
};

export const statement = (data, options) => {
  return calculatorAxiosInstance.post(CALCULATOR_STATEMENT(), data, options);
};

export const waterfall = (data, options) => {
  return calculatorAxiosInstance.post(CALCULATOR_WATERFALL(), data, {
    ...options,
    responseType: "blob",
  });
};

export const endOfMonth = (data, options) => {
  return calculatorAxiosInstance.post(CALCULATOR_END_OF_MONTH(), data, {
    ...options,
    responseType: "blob",
  });
};

export { calculatorAxiosInstance };
