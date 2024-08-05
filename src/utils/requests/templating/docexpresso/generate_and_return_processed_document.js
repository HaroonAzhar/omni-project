import axios from "axios";

import getDXAccessToken from "./get_dx_access_token";
import convertBase64toBlob from "./convert_base64_to_blob";

const waitToPreventCorsError = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

async function generateAndReturnProcessedDocument(
  base64template,
  removeList,
  cloneList,
  replaceVars,
  url_generate_document
) {
  const access_token = await getDXAccessToken();
  const document_request = {
    template: base64template,
    output: "odt",
    remove: removeList,
    clone: cloneList,
    replace: [
      {
        vars: replaceVars,
      },
    ],
  }; // End of document request definition
  const generate_headers = {
    Authorization: `Bearer ${access_token}`,
  };
  await waitToPreventCorsError();
  const generate_result = await axios.post(
    url_generate_document,
    document_request,
    { headers: generate_headers }
  );
  const outputContent = generate_result.document;
  const blob = convertBase64toBlob(
    outputContent,
    "application/vnd.oasis.opendocument.text"
  );

  window.open(URL.createObjectURL(blob));
}

export default generateAndReturnProcessedDocument;
