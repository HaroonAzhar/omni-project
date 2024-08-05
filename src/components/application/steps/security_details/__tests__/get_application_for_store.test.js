import getApplicationForStore from "../get_application_for_store";

describe("getApplicationForStore", () => {
  it("When loan purpose is not purchase already owned is true and being purchase is false for the first security", () => {
    const application = {
      loan_purpose: "not_purchase",
      securities: [{}],
    };

    const expectedProperty = {
      details: {
        being_purchased: false,
        already_owned: true,
      },
    };

    const newApplication = getApplicationForStore(application);

    expect(newApplication.properties[0]).toEqual(
      expect.objectContaining(expectedProperty)
    );
  });

  it("When loan purpose is purchase already owned is false and being purchase is true for the first security", () => {
    const application = {
      loan_purpose: "purchase",
      securities: [{}],
    };

    const expectedProperty = {
      details: {
        being_purchased: true,
        already_owned: false,
      },
    };

    const newApplication = getApplicationForStore(application);

    expect(newApplication.properties[0]).toEqual(
      expect.objectContaining(expectedProperty)
    );
  });

  it("When loan purpose is purchase_price is set for the first security", () => {
    const application = {
      loan_purpose: "purchase",
      securities: [{}, {}],
      purchase_price: "purchase_price",
    };

    const expectedProperty = {
      details: {
        being_purchased: true,
        already_owned: false,
        purchase_price: "purchase_price",
      },
    };

    const newApplication = getApplicationForStore(application);

    expect(newApplication.properties[0]).toEqual(
      expect.objectContaining(expectedProperty)
    );

    expect(newApplication.properties[1]).toEqual(
      expect.objectContaining({
        details: {
          purchase_price: undefined,
        },
      })
    );
  });
});
