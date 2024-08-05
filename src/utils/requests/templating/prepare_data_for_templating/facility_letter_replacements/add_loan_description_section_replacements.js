import { capitalize } from "utils";

import asEntry from "../as_entry";

const addLoanDescriptionSectionReplacements = (
  application,
  loanAdvanceTypes,
  lists
) => {
  lists.replacementList.push(
    asEntry("singleMultipleText", capitalize(application?.loan_advance_type))
  );

  loanAdvanceTypes.forEach((value) => {
    if (value !== application?.type_of_loan) {
      lists.removeList.push({
        options: {
          needle: `${value}OnlyPara`,
          element: "paragraph",
        },
      });
    }
    lists.replacementList.push(asEntry(`${value}OnlyPara`, ""));
  });

  if (application?.loan_advance_type === "single") {
    lists.removeList.push({
      options: {
        needle: "{{multipleOnlyPara}}",
        element: "paragraph",
      },
    });
  } else {
    lists.removeList.push({
      options: {
        needle: "{{individualOnlyRow}}",
        element: "table-row",
      },
    });
  }

  lists.replacementList.push(asEntry("singleOnlyPara", ""));
};

export default addLoanDescriptionSectionReplacements;
