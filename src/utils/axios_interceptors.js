import axios from "axios";

import { getUserTokenFromFirebase } from "./get_user_token";

export const unpackInterceptor = (response) => response.data;

export const withTokenInterceptor = async (
  config,
  getUserToken = getUserTokenFromFirebase
) => {
  const newConfig = { ...config };
  const authorizationToken = await getUserToken();

  if (authorizationToken) {
    newConfig.headers.Authorization = `Bearer ${authorizationToken}`;
  }

  return newConfig;
};

axios.interceptors.response.use(unpackInterceptor);
