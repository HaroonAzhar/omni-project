const formatAddress = (address = {}) => {
  const addressElements = [
    address.line_1,
    address.line_2,
    address.address_line_1,
    address.address_line_2,
    address.city,
    address.postcode,
  ];
  return addressElements.filter(Boolean).join(", ");
};

export default formatAddress;
