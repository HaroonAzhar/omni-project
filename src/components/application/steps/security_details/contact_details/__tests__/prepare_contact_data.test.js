import prepareContactData from "../helpers/prepare_contact_data";

const getTestingObject = ({
  selectedContact,
  contactFor = "access",
  additionalData = {},
}) => ({
  [`selected_contact_for_${contactFor}_valuation`]: selectedContact,
  [`contact_for_${contactFor}_valuation_name`]: "test a",
  [`contact_for_${contactFor}_valuation_phone`]: "+111 111 111",
  [`contact_for_${contactFor}_valuation_email`]: "email@test.com",
  ...additionalData,
});

describe("prepareContactData", () => {
  it("Run toSend data in case individual", () => {
    const input = getTestingObject({
      selectedContact: "1",
    });
    const output = prepareContactData.toSend(input);

    expect(output).toEqual(
      getTestingObject({
        selectedContact: "applicant",
        additionalData: {
          selected_contact_applicant_id_for_access_valuation: "1",
        },
      })
    );
  });

  it("Run toSend data in case manual", () => {
    const input = getTestingObject({
      selectedContact: "manual",
    });
    const output = prepareContactData.toSend(input);

    expect(output).toEqual(
      getTestingObject({
        selectedContact: "manual",
      })
    );
  });

  it("Run toSend data in case introducer", () => {
    const input = getTestingObject({
      selectedContact: "introducer",
    });
    const output = prepareContactData.toSend(input);

    expect(output).toEqual(
      getTestingObject({
        selectedContact: "introducer",
      })
    );
  });

  it("getInitialDetails parse applicant id correctly", () => {
    const input = getTestingObject({
      selectedContact: "applicant",
      additionalData: {
        selected_contact_applicant_id_for_access_valuation: "1",
      },
    });
    const output = prepareContactData.getInitialDetails(input);

    expect(output).toEqual(
      getTestingObject({
        selectedContact: "1",
        additionalData: {
          selected_contact_applicant_id_for_access_valuation: "1",
        },
      })
    );
  });
});
