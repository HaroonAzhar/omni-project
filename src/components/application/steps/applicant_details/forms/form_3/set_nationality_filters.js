import {
  isBritish,
  isEaaSwiss,
  isIrish,
} from "components/application/helpers/nationalities";

import {
  ukResidentialStatusOptions,
  eeaSwissResidentialStatusOptions,
} from "./status_options";

const modifyForBritishCitizen = (
  form,
  setUkResidentialStatusVisible,
  setPermanentRightToResideVisible
) => {
  form.change("personal_data.permanent_resident", true);
  form.change("personal_data.uk_residential_status", "Citizen");
  setPermanentRightToResideVisible(false);
  setUkResidentialStatusVisible(false);
};

const modifyForIrishCitizen = (
  form,
  setUkResidentialStatusVisible,
  setPermanentRightToResideVisible
) => {
  form.change("personal_data.permanent_resident", true);
  form.change("personal_data.uk_residential_status", "Irish Citizen");
  setUkResidentialStatusVisible(true);
  setPermanentRightToResideVisible(true);
};

const resetForNonBritish = (
  form,
  setUkResidentialStatusVisible,
  setPermanentRightToResideVisible
) => {
  form.change("personal_data.permanent_resident", undefined);
  form.change("personal_data.uk_residential_status", undefined);
  setUkResidentialStatusVisible(true);
  setPermanentRightToResideVisible(true);
};

const modifyForEaaCitizen = (
  form,
  setUkResidentialStatusVisible,
  setPermanentRightToResideVisible,
  setResidentialStatuses
) => {
  resetForNonBritish(
    form,
    setUkResidentialStatusVisible,
    setPermanentRightToResideVisible
  );
  setResidentialStatuses(eeaSwissResidentialStatusOptions);
};

const modifyForOtherCitizen = (
  form,
  setUkResidentialStatusVisible,
  setPermanentRightToResideVisible,
  setResidentialStatuses
) => {
  resetForNonBritish(
    form,
    setUkResidentialStatusVisible,
    setPermanentRightToResideVisible
  );
  setResidentialStatuses(ukResidentialStatusOptions);
};

const setNationalityFilters = (
  value,
  values,
  form,
  setUkResidentialStatusVisible,
  setPermanentRightToResideVisible,
  setResidentialStatuses
) => {
  if (isBritish(values)) {
    modifyForBritishCitizen(
      form,
      setUkResidentialStatusVisible,
      setPermanentRightToResideVisible,
      setResidentialStatuses
    );
    return;
  }

  if (isIrish(values)) {
    modifyForIrishCitizen(
      form,
      setUkResidentialStatusVisible,
      setPermanentRightToResideVisible,
      setResidentialStatuses
    );
    return;
  }

  if (isEaaSwiss(values)) {
    modifyForEaaCitizen(
      form,
      setUkResidentialStatusVisible,
      setPermanentRightToResideVisible,
      setResidentialStatuses
    );
    return;
  }

  modifyForOtherCitizen(
    form,
    setUkResidentialStatusVisible,
    setPermanentRightToResideVisible,
    setResidentialStatuses
  );
};

export default setNationalityFilters;
