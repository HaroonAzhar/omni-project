import { useCallback } from "react";

import { patchApplicant } from "utils/requests";

export default (id) =>
  useCallback(
    (applicant) => {
      const {
        property_portfolio,
        applicant_id,
        assets_liabilities_additional = {},
      } = applicant;

      assets_liabilities_additional.status = "Edited";
      assets_liabilities_additional.date_edited = new Date();

      return patchApplicant({
        applicant: {
          property_portfolio,
          applicant_id,
          assets_liabilities_additional,
        },
        id,
        applicantType: "individual",
      });
    },
    [id]
  );
