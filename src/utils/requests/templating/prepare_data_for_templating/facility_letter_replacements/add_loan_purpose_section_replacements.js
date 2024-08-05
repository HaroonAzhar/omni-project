import asEntry from "../as_entry";
import formatAddress from "../format_address";
import formatCapitalRaisingPurpose from "../../../../../components/pages/loan_facility/pdf/document/particulars/format_capital_raising_purpose";

const addLoanPurposeSectionReplacements = (application, property, lists) => {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    lists.replacementList.push(entry);
  };

  const purpose_of_borrowings = property?.details?.purpose_of_borrowings;

  const addressText = formatAddress(property?.address);

  const developmentPart =
    application?.building_type === "development" ? "and Development " : "";
  const capitalRaisingDevelopment =
    application?.building_type === "development"
      ? `Development of the property at ${addressText} and `
      : "";

  const capitalRaisingPurpose = formatCapitalRaisingPurpose(
    purpose_of_borrowings
  );
  const purposes = {
    purchase: `Purchase ${developmentPart}of the property at ${addressText}`,
    refinance: `Refinance ${developmentPart}of the property at ${addressText}`,
    capital_raising: `${capitalRaisingDevelopment}${capitalRaisingPurpose}`,
  };
  addReplacement("loanPurposeText", purposes[application?.loan_purpose]);
};

export default addLoanPurposeSectionReplacements;
