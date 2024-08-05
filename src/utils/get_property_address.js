export default (property = {}) => {
  const nameParts = [
    property.address_line_1,
    property.address_line_2,
    property.postcode,
    property.city,
    property.country,
  ];
  return nameParts.filter((part) => part).join(",");
};
