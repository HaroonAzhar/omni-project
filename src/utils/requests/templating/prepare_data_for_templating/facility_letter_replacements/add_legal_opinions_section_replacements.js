import asEntry from "../as_entry";

const addLegalOpinionSectionReplacements = (application, lists) => {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    lists.replacementList.push(entry);
  };

  if (application?.type_of_applicant !== "company") {
    lists.removeList.push({
      options: {
        needle: "overseasCompanyOnlyListItem",
        element: "table-row",
      },
    });
    lists.removeList.push({
      options: {
        needle: "overseasCompanyOnlyListItem",
        element: "paragraph",
      },
    });
    return false;
  }

  const notNeededCountries = [
    "united kingdom",
    "england",
    "scotland",
    "wales",
    "northern ireland",
  ];

  const [company = {}] = application?.company;
  const { address = {} } = company;
  const { registered = {} } = address;
  const { country: companyCountry } = registered;

  const legalOpinions = !notNeededCountries.includes(companyCountry);

  if (!legalOpinions) {
    lists.removeList.push({
      options: {
        needle: "overseasCompanyOnlyListItem",
        element: "table-row",
      },
    });
    lists.removeList.push({
      options: {
        needle: "overseasCompanyOnlyListItem",
        element: "paragraph",
      },
    });
  }

  addReplacement("overseasCompanyOnlyListItem", ""); // Clear the placeholder
};

export default addLegalOpinionSectionReplacements;
