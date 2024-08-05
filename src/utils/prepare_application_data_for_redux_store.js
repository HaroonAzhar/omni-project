import { prepareDipDataForReduxStore } from "utils";

const prepareAdditionalInformation = (preparedData) => {
  preparedData.additional_information = {
    additional_information: preparedData.additional_information,
  };
};

export default (data) => {
  const { preApplication, calculator } = prepareDipDataForReduxStore(data);

  if (preApplication.additional_information)
    prepareAdditionalInformation(preApplication);

  return { application: preApplication, calculator };
};
