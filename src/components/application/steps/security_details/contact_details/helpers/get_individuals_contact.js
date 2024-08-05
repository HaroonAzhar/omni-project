import { getIndividualTitle } from "utils";

export default (individuals) => {
  const individualsContactData = individuals.reduce((acc, item) => {
    const { home_phone, mobile_phone, work_phone } = item.contact || {};
    const name = getIndividualTitle(item);

    return {
      ...acc,
      [item.applicant_id]: {
        name,
        applicant_id: item.applicant_id,
        email: item.contact && item.contact.email,
        home_phone,
        mobile_phone,
        work_phone,
      },
    };
  }, {});

  return individualsContactData;
};
