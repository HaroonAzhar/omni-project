import {
  isBritish,
  isEaaSwiss,
  isIrish,
} from "components/application/helpers/nationalities";

const combineIndividualsAndCompaniesIntoAmlKycApplicants = (
  individuals,
  companies
) => {
  const preparedIndividuals = (individuals || []).map((individual) => {
    const { title, forename, middle_name, surname } = individual.personal_data;
    const label = [title, forename, middle_name, surname]
      .filter(Boolean)
      .join(" ");

    return {
      applicant_id: individual.applicant_id,
      aml_kyc: { ...individual.aml_kyc },
      isIndividualFromUK: isBritish(individual),
      isIndividualFromEeaSwiss: isEaaSwiss(individual),
      isIndividualFromIreland: isIrish(individual),
      label,
      isCompany: false,
    };
  });

  const preparedCompanies = (companies || []).map((company) => {
    const { name } = company.base_data;

    return {
      applicant_id: company.applicant_id,
      aml_kyc: { ...company.aml_kyc },
      shared_holders: company.shared_holders,
      isCompany: true,
      label: name ? name : "",
    };
  });
  const allApplicants = [...preparedIndividuals, ...preparedCompanies];
  const applicantsWithValidLabels = allApplicants.filter(
    (applicant) => applicant.label
  );

  const indexedApplicants = applicantsWithValidLabels.map(
    (applicant, index) => ({ ...applicant, index })
  );

  return indexedApplicants;
};

export default combineIndividualsAndCompaniesIntoAmlKycApplicants;
