import addressFormat from "./address_format";

const joinAddresses = (applicant) =>
  [
    ...(applicant.addresses || []),
    applicant.registeredAddress,
    applicant.correspondenceAddress,
  ]
    .filter(Boolean)
    .map(addressFormat);

const mapApplicantsForTable = (applicants) =>
  applicants.map((applicant, index) => ({
    index: index + 1,
    name: applicant.Name,
    phone: [
      applicant.WorkPhone,
      applicant.MobilePhone,
      applicant.HomePhone,
    ].filter(Boolean),
    email: applicant.Email,
    address: joinAddresses(applicant),
  }));

export default mapApplicantsForTable;
