const formatName = (name = {}) => {
  const nameElements = [
    name.title,
    name.forename,
    name.middle_name,
    name.surname,
  ];
  return nameElements.filter(Boolean).join(" ");
};

export default formatName;
