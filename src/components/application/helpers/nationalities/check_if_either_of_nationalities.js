const checkIfEitherOfNationalities = (nationalitiesCheck) => ({
  personal_data,
}) => {
  const applicantNationalities = [
    personal_data?.nationality,
    personal_data?.second_nationality,
  ];

  return applicantNationalities.some(nationalitiesCheck);
};

export default checkIfEitherOfNationalities;
