import asEntry from "../as_entry";
import asBlockFacilityLetter from "../as_block_facility_letter";

const addSpecialConditionsSectionReplacements = (
  application,
  loanAdvanceTypes,
  lists
) => {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    lists.replacementList.push(entry);
  };

  loanAdvanceTypes.forEach((value) => {
    if (value !== application?.type_of_loan) {
      lists.removeList.push({
        options: {
          needle: `${value}OnlyListItem`,
          element: "paragraph",
        },
      });
    }
  });

  addReplacement("servicedOnlyListItem", ""); // Clear the placeholder
  addReplacement("rolled_upOnlyListItem", ""); // Clear the placeholder
  addReplacement("retainedOnlyListItem", ""); // Clear the placeholder

  if (
    application?.summary?.further_comments?.special_conditions === undefined
  ) {
    lists.removeList.push({
      options: {
        needle: `specialConditionsOnlyRow`,
        element: "paragraph",
      },
    });
  } else {
    lists.replacementList.push(
      asBlockFacilityLetter(
        "specialConditionsText",
        application?.summary?.further_comments?.special_conditions
      )
    );
    addReplacement("specialConditionsOnlyRow", ""); // Clear the placeholder
  }
};

export default addSpecialConditionsSectionReplacements;
