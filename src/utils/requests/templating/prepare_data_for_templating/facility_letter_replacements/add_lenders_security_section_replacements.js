import { dateFormat } from "utils";

import asEntry from "../as_entry";
import formatAddress from "../format_address";

const addLendersSecuritySectionReplacements = (
  application,
  property,
  lists
) => {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    lists.replacementList.push(entry);
  };

  const addressText = formatAddress(property?.address);

  const outstandingOpflDate = dateFormat(application?.date_of_outstanding_opfl);

  if (application?.date_of_outstanding_opfl === undefined) {
    lists.removeList.push({
      options: {
        needle: "{{isDateOutstandingOpflOnlyPara}}",
        element: "paragraph",
      },
    });
  } else {
    addReplacement("outstandingOpflDateText", outstandingOpflDate);
    addReplacement("securityAddress", addressText);
  }

  if (application?.type_of_applicant !== "company") {
    lists.removeList.push({
      options: {
        needle: "{{companyLendersSecurityOnlyPara}}",
        element: "paragraph",
      },
    });
  } else {
    lists.removeList.push({
      options: {
        needle: "{{individualLendersSecurityOnlyPara}}",
        element: "paragraph",
      },
    });
  }
  lists.replacementList.push(asEntry("companyLendersSecurityOnlyPara", ""));
  lists.replacementList.push(asEntry("individualLendersSecurityOnlyPara", ""));
};

export default addLendersSecuritySectionReplacements;
