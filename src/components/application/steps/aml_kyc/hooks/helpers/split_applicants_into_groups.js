const splitApplicantsIntoGroups = (applicants) => {
  const companies = applicants.filter((applicant) => applicant.isCompany);
  const individuals = applicants.filter((applicant) => !applicant.isCompany);
  const ukIndividuals = individuals.filter(
    (applicant) => applicant.isIndividualFromUK
  );
  const nonUkIndividuals = individuals.filter(
    (applicant) => !applicant.isIndividualFromUK
  );

  return { ukIndividuals, nonUkIndividuals, companies };
};

export default splitApplicantsIntoGroups;
