import { useParams } from "react-router";
import { useSelector } from "react-redux";

import { patchApplicant } from "utils/requests";

export default ({ indexOfElement, indexOfAsset }) => {
  const { id } = useParams();
  const individuals = useSelector((store) => store.application.individuals);

  const applicant = individuals[indexOfElement] || {};

  const {
    assets,
    liabilities,
    assets_liabilities_additional,
    applicant_id,
  } = applicant;
  const editedData = { status: "Edited", date_edited: new Date() };

  return ({ updateWithValues, toRemove }) => {
    const newAssets = [...assets, ...liabilities];
    newAssets[indexOfAsset] = updateWithValues;

    if (toRemove) {
      newAssets.splice(indexOfAsset, 1);
    }

    return patchApplicant({
      applicant: {
        assets: newAssets,
        liabilities: [],
        assets_liabilities_additional: {
          ...editedData,
          ...assets_liabilities_additional,
        },
        applicant_id,
      },
      id,
      applicantType: "individual",
    });
  };
};
