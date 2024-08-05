export default (individual = {}) => {
  const { personal_data = {} } = individual;
  const name_elements = [
    personal_data.forename,
    personal_data.middle_name,
    personal_data.surname,
  ];
  return name_elements.filter(Boolean).join(" ");
};
