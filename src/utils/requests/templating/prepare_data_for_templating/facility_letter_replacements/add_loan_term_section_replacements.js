import asEntry from "../as_entry";

const addLoanTermSectionReplacements = (
  application,
  loanAdvanceTypes,
  lists
) => {
  loanAdvanceTypes.forEach((value) => {
    if (value !== application?.type_of_loan) {
      lists.removeList.push({
        options: {
          needle: `${value}OnlyRow`,
          element: "table-row",
        },
      });
    } else {
      lists.removeList.push({
        options: {
          needle: `not${value}Row`,
          element: "table-row",
        },
      });
    }
    lists.replacementList.push(asEntry(`${value}OnlyRow`, ""));
    lists.replacementList.push(asEntry(`not${value}Row`, ""));
    lists.replacementList.push(asEntry(`nonHybridOnlyPara`, ""));

    lists.removeList.push({
      options: {
        needle: `hybridStartRetainedOnlyPara`,
        element: "paragraph",
      },
    });
  });
};

export default addLoanTermSectionReplacements;
