import axios from "axios";

function getBase64(url) {
  return axios
    .get(url, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      return Buffer.from(response, "binary").toString("base64");
    });
}

export default getBase64;
