export default (individual = {}) => {
  if (!individual.personal_data) return;
  return `${individual.personal_data.forename} ${individual.personal_data.surname}`;
};
