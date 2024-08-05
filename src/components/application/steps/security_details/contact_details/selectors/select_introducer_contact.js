import { createSelector } from "reselect";

const getApplication = (state) => state.application;

const selectIntroducerContact = createSelector(
  [getApplication],
  ({ introducer_details = {}, type_of_introducer }) => {
    if (type_of_introducer !== "via_broker") return;
    return {
      name: introducer_details.introducer,
      email: introducer_details.email,
      phone: introducer_details.phone_number,
    };
  }
);

export default selectIntroducerContact;
