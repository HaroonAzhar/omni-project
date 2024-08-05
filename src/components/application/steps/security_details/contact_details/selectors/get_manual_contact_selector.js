import { createSelector } from "reselect";

const getApplication = (state) => state.application;

const getKeyNames = (contactFor) => ({
  name: `contact_for_${contactFor}_valuation_name`,
  email: `contact_for_${contactFor}_valuation_email`,
  phone: `contact_for_${contactFor}_valuation_phone`,
});

const getManualContactSelector = (propertyId, contactFor) =>
  createSelector([getApplication], ({ properties = [] }) => {
    const { details = {} } = properties[propertyId] || {};
    const keyNames = getKeyNames(contactFor);

    return {
      name: details[keyNames.name],
      email: details[keyNames.email],
      phone: details[keyNames.phone],
      isManual: true,
    };
  });

export default getManualContactSelector;
