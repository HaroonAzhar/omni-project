const mapPropertyAddress = (property) => ({
  line_1: property.AddressLine1,
  line_2: property.AddressLine2,
  postcode: property.AddressPostcode,
  town_city: property.AddressCity,
  country: property.AddressCountry,
});

export default mapPropertyAddress;
