const propertyAddressFormat = ({ address = {} }) =>
  [address.line_1, address.line_2, address.town_city, address.postcode]
    .filter(Boolean)
    .join(", ");

export default propertyAddressFormat;
