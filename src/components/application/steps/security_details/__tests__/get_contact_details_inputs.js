export default (container, contactFor = "test2") => {
  const contactDropdown = container.querySelector(
    `[name="details.selected_contact_for_${contactFor}_valuation"]`
  );
  const nameElement = container.querySelector(
    `[name="details.contact_for_${contactFor}_valuation_name"]`
  );
  const emailElement = container.querySelector(
    `[name="details.contact_for_${contactFor}_valuation_email"]`
  );
  const phoneElement = container.querySelector(
    `[name="details.contact_for_${contactFor}_valuation_phone"]`
  );

  return {
    contactDropdown,
    nameElement,
    emailElement,
    phoneElement,
  };
};

it.skip("", () => {});
