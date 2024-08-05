const convertSecurityIntoProperty = (security, property) => ({
  status: "New",
  ...property,
  address: {
    line_1: security.security_address_line_1,
    line_2: security.security_address_line_2,
    postcode: security.security_postcode,
    city: security.security_town_city,
    country: security.security_country,
  },
  details: {
    ...(property && property.details),
    current_value: security.security_initial_estimation,
    value_after_works: security.gdv,
    security_type: security.security_type,
  },
  charge: {
    current_mortgage_outstanding: security.value_existing_mortgage,
    lenders: [
      { current_mortgage_outstanding: security.value_existing_mortgage },
    ],
    ...(property && property.charge),
    opfl_charge_type: security.opfl_charge_type,
  },
});

export default convertSecurityIntoProperty;
