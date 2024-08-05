import axios from "axios";

import { POSTCODER_URL } from "utils/urls";
const { REACT_APP_POSTCODER_API_KEY } = process.env;

export const handlePostcoderLookup = ({ addressToSearch }) => {
  const url = `${POSTCODER_URL}/${REACT_APP_POSTCODER_API_KEY}/address/UK/${encodeURIComponent(
    addressToSearch
  )}?format=json&lines=2`;

  return axios.get(url);
};
