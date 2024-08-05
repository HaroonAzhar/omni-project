import axios from "axios";

const DXTOKEN = process.env.REACT_APP_DXTOKEN;
const GET_TOKEN_URL = "https://api.docxpresso.cloud/generateAccessToken";

async function getDXAccessToken() {
  const accesstoken_headers = {
    "X-Api-Key": DXTOKEN,
    accept: "application/json",
  };
  const token_data = await axios.get(GET_TOKEN_URL, {
    headers: accesstoken_headers,
  });
  return token_data.access_token;
}

export default getDXAccessToken;
