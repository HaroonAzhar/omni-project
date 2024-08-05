import asEntry from "../as_entry";

const addAboutOfferSectionReplacements = (application, lists) => {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    lists.replacementList.push(entry);
  };

  const isCompanyOnly = application?.type_of_applicant === "company";
  const isDevelopmentOnly = application?.building_type === "development";
  const isMultipleAdvanceOnly = application?.loan_advance_type === "multiple";
  let conditionCountText = ":";

  if (isDevelopmentOnly || isMultipleAdvanceOnly) {
    conditionCountText = ". It is divided into two parts:";
  }

  if (isDevelopmentOnly && isMultipleAdvanceOnly) {
    conditionCountText = ". It is divided into three parts:";
  }
  addReplacement("conditioncount", conditionCountText);

  if (isCompanyOnly) {
    addReplacement("aboutCompanyTextOne", "and the Debenture");
    addReplacement(
      "aboutCompanyTextTwo",
      "Where a guarantor is required then the form of guarantee will be sent to the guarantor or his/her solicitors."
    );
    addReplacement("companyOnlyTextAndDebenture", " and Debenture");
  } else {
    addReplacement("aboutCompanyTextOne", "");
    addReplacement("aboutCompanyTextTwo", "");
    addReplacement("companyOnlyTextAndDebenture", "");
  }

  // Handle developmentOnlyListItem
  addReplacement("developmentOnlyListItem", "");
  if (!isDevelopmentOnly) {
    lists.removeList.push({
      options: {
        needle: "{{developmentOnlyListItem}}",
        element: "paragraph",
      },
    });
  }

  // Handle multipleAdvanceOnlyListItem
  addReplacement("multipleAdvanceOnlyRow", "");
  addReplacement("multipleAdvanceOnlyListItem", "");
  if (!isMultipleAdvanceOnly) {
    lists.removeList.push({
      options: {
        needle: "{{multipleAdvanceOnlyListItem}}",
        element: "paragraph",
      },
    });
    lists.removeList.push({
      options: {
        needle: "{{multipleAdvanceOnlyPara}}",
        element: "paragraph",
      },
    });
    lists.removeList.push({
      options: {
        needle: "{{multipleAdvanceOnlyRow}}",
        element: "table-row",
      },
    });
  }
};

export default addAboutOfferSectionReplacements;
