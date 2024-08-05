import asEntry from "../as_entry";

const addSolicitorDetailsSectionReplacements = (additionalOptions, lists) => {
  const solicitorAddress = [
    additionalOptions?.lenders_solicitor?.Address?.Line1,
    additionalOptions?.lenders_solicitor?.Address?.Line2,
    additionalOptions?.lenders_solicitor?.Address?.TownCity,
    additionalOptions?.lenders_solicitor?.Address?.Postcode,
  ]
    .filter(Boolean)
    .join(", ");

  lists.replacementList.push(
    asEntry("solicitorName", additionalOptions?.lenders_solicitor?.Name)
  );

  lists.replacementList.push(asEntry("solicitorAddress", solicitorAddress));
};

export default addSolicitorDetailsSectionReplacements;
