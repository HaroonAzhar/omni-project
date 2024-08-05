const prepareApplicantName = ({
  forename,
  middle_name,
  surname,
  date_of_birth,
  name = "",
}) => {
  const nameParts = name.split(" ");
  return {
    forename: forename ?? nameParts[0],
    middle_name:
      middle_name ?? (nameParts.length > 2 ? nameParts[1] : undefined),
    surname: surname ?? nameParts[nameParts.length - 1],
    date_of_birth,
  };
};

const getImportedIndividual = (applicant) => ({
  personal_data: prepareApplicantName(applicant),
  addresses: [{}],
  contact: { email: applicant.email },
  status: "New",
  links: applicant.fk_shared_contact_id,
  fk_shared_contact_id: applicant.fk_shared_contact_id,
  notReady: true,
});

const getExistingIndividualIfExist = (existingIndividuals, index) =>
  existingIndividuals && existingIndividuals[index];

const mergeExistingIndividualWithApplicant = (
  existingIndividual,
  individualFromApplicant
) => {
  if (existingIndividual) {
    return {
      ...existingIndividual,
      personal_data: {
        ...existingIndividual.personal_data,
        forename: individualFromApplicant.personal_data.forename,
        surname: individualFromApplicant.personal_data.surname,
      },
    };
  } else {
    return individualFromApplicant;
  }
};

const filterApplicantsWhichHaveIdAsTheyAreExisitingIndividuals = (applicant) =>
  !applicant.applicant_id;

const combineApplicantWithIndividuals = (
  individualFromApplicant,
  index,
  existingIndividuals
) => {
  const existingIndividual = getExistingIndividualIfExist(
    existingIndividuals,
    index
  );
  return mergeExistingIndividualWithApplicant(
    existingIndividual,
    individualFromApplicant
  );
};

const fillIndividualsWithIndividualApplicants = (
  existingIndividuals,
  applicants
) => {
  return applicants
    .filter(filterApplicantsWhichHaveIdAsTheyAreExisitingIndividuals)
    .map(getImportedIndividual)
    .map((individualFromApplicant, index) =>
      combineApplicantWithIndividuals(
        individualFromApplicant,
        index,
        existingIndividuals
      )
    );
};

const fillIndividualsWithOtherData = (
  { individuals: existingIndividuals },
  { type_of_applicant, applicants }
) => {
  if (type_of_applicant === "individual") {
    return fillIndividualsWithIndividualApplicants(
      existingIndividuals,
      applicants
    );
  }

  return existingIndividuals;
};

export default fillIndividualsWithOtherData;
