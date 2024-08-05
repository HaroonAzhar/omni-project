const makeCountryNamesLowercase = (address) => {
  if (address.country) {
    address.country = address.country.map((item) => {
      return item.toLowerCase();
    });
  }
};

export default (place) => {
  if (!place.address_components) return {};

  const addressComponentsMapping = {
    line_1: ["street_address", "street_number", "route"],
    line_2: Array.from(
      { length: 5 },
      (_, i) => `administrative_area_level_${i + 1}`
    ),
    town_city: ["postal_town"],
    postcode: ["postal_code"],
    country: ["country"],
  };

  const address = {};
  place.address_components.forEach((address_component) => {
    Object.entries(addressComponentsMapping).forEach(
      ([addressComponent, possibleTypes]) => {
        possibleTypes.forEach((type) => {
          if (address_component.types.includes(type)) {
            address[addressComponent] = address[addressComponent]
              ? [...address[addressComponent], address_component.long_name]
              : [address_component.long_name];
          }
        });
      }
    );
  });

  makeCountryNamesLowercase(address);

  return Object.entries(address).reduce(
    (result, [addressComponent, values]) => {
      result[addressComponent] = values.join(", ");
      return result;
    },
    {}
  );
};
