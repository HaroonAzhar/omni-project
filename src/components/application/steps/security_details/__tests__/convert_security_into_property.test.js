import convertSecurityIntoProperty from "../convert_security_into_property";

describe("convertSecurityIntoProperty", () => {
  it("Takes address of the dip security", () => {
    const security = {
      security_address_line_1: "security_address_line_1",
      security_address_line_2: "security_address_line_2",
      security_postcode: "security_postcode",
      security_town_city: "security_town_city",
      security_country: "security_country",
    };

    const property = {
      address: {
        line_1: "line1",
        other_field: "other_field",
      },
    };

    const expectedProperty = {
      address: {
        line_1: security.security_address_line_1,
        line_2: security.security_address_line_2,
        postcode: security.security_postcode,
        city: security.security_town_city,
        country: security.security_country,
      },
    };

    const convertedProperty = convertSecurityIntoProperty(security, property);

    expect(convertedProperty).toEqual(
      expect.objectContaining(expectedProperty)
    );
  });

  it("Merges property details from security with precedence of values from security", () => {
    const security = {
      security_initial_estimation: "security_initial_estimation",
      gdv: "gdv",
      security_type: "security_type",
    };

    const property = {
      details: {
        security_type: "property_security_type",
        other_field: "other_field",
      },
    };

    const expectedProperty = {
      details: {
        current_value: security.security_initial_estimation,
        value_after_works: security.gdv,
        security_type: security.security_type,
        other_field: property.details.other_field,
      },
    };

    const convertedProperty = convertSecurityIntoProperty(security, property);

    expect(convertedProperty).toEqual(
      expect.objectContaining(expectedProperty)
    );
  });

  it("Keeps security charge type", () => {
    const security = {
      opfl_charge_type: "opfl_charge_type",
      current_mortgage_outstanding: "current_mortgage_outstanding",
    };

    const property = {
      charge: {
        opfl_charge_type: "opfl_charge_type_property",
        current_mortgage_outstanding: "current_mortgage_outstanding_property",
        lenders: [
          {
            current_mortgage_outstanding: "current_mortgage_outstanding_lender",
          },
        ],
      },
    };

    const expectedProperty = {
      charge: {
        opfl_charge_type: security.opfl_charge_type,
        current_mortgage_outstanding:
          property.charge.current_mortgage_outstanding,
        lenders: property.charge.lenders,
      },
    };

    const convertedProperty = convertSecurityIntoProperty(security, property);

    expect(convertedProperty).toEqual(
      expect.objectContaining(expectedProperty)
    );
  });

  it("Additional property fields are kept", () => {
    const security = {};

    const property = {
      additional: {},
    };

    const expectedProperty = {
      additional: {},
    };

    const convertedProperty = convertSecurityIntoProperty(security, property);

    expect(convertedProperty).toEqual(
      expect.objectContaining(expectedProperty)
    );
  });

  it("Default status is New", () => {
    const security = {};

    const property = {};

    const expectedProperty = {
      status: "New",
    };

    const convertedProperty = convertSecurityIntoProperty(security, property);

    expect(convertedProperty).toEqual(
      expect.objectContaining(expectedProperty)
    );
  });

  it("Property status is kept", () => {
    const security = {};

    const property = { status: "property_status" };

    const expectedProperty = {
      status: "property_status",
    };

    const convertedProperty = convertSecurityIntoProperty(security, property);

    expect(convertedProperty).toEqual(
      expect.objectContaining(expectedProperty)
    );
  });
});
