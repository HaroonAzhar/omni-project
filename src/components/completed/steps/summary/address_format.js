const addressFormat = (security) => {
  return [
    security.SecurityAddressLine1,
    security.SecurityAddressLine2,
    security.SecurityAddressTownCity,
    security.SecurityPostcode,
  ]
    .filter(Boolean)
    .join(", ");
};

export default addressFormat;
