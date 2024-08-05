const contactsTypes = ["access", "payment"];

const toSend = (details) => {
  const preparedDetails = { ...details };

  contactsTypes.forEach((contactFor) => {
    const selectedContactInputKey = `selected_contact_for_${contactFor}_valuation`;
    const selectedApplicantIdKey = `selected_contact_applicant_id_for_${contactFor}_valuation`;

    if (!preparedDetails[selectedContactInputKey]) return;

    switch (preparedDetails[selectedContactInputKey]) {
      case "manual":
        break;
      case "introducer":
        break;
      default:
        preparedDetails[selectedApplicantIdKey] =
          preparedDetails[selectedContactInputKey];
        preparedDetails[selectedContactInputKey] = "applicant";
    }
  });

  return preparedDetails;
};

const getInitialDetails = (details) => {
  const initialDetails = { ...details };

  contactsTypes.forEach((contactFor) => {
    const selectedContactInputKey = `selected_contact_for_${contactFor}_valuation`;
    const selectedApplicantIdKey = `selected_contact_applicant_id_for_${contactFor}_valuation`;

    const isApplicantContact =
      initialDetails[selectedContactInputKey] === "applicant";

    const applicantId = initialDetails[selectedApplicantIdKey];

    if (!isApplicantContact) return;

    initialDetails[selectedContactInputKey] = applicantId;
  });

  return initialDetails;
};

export default {
  toSend,
  getInitialDetails,
};
