import React, { useState } from "react";
import { titleize } from "inflected";

import { SelectInput } from "components/atoms";

import { ViewCompletedSecuritiesWrapper } from "./styled_view_completed_securities";
import useCompletedSecuritiesData from "./use_completed_securities_data";
import ViewCompletedSecurity from "./view_completed_security";

const converted = "CONVERTED";
const released = "RELEASED";

const ViewCompletedSecurities = () => {
  const { securities } = useCompletedSecuritiesData(true);
  const [filter, setFilter] = useState("");

  const options = ["Current", titleize(converted), titleize(released)];

  const filteredSecurities = (field) => {
    let filteredSecuritesVar = [];
    switch (field.toUpperCase()) {
      case converted:
        filteredSecuritesVar = securities.filter(
          (security) => security?.isConverted === true
        );
        break;
      case released:
        filteredSecuritesVar = securities.filter(
          (security) => security?.isReleased === true
        );
        break;
      default:
        filteredSecuritesVar = securities.filter((security) => security);
    }

    return filteredSecuritesVar;
  };

  const filteredSecuritiesVar = filteredSecurities(filter);

  return (
    <ViewCompletedSecuritiesWrapper>
      <SelectInput
        input={{
          onChange: (event) => {
            const actionName = event.target.value;
            setFilter(actionName);
          },
          filter,
        }}
        options={options}
      />
      {filteredSecuritiesVar.map((security) => (
        <ViewCompletedSecurity key={security.SecurityId} security={security} />
      ))}
    </ViewCompletedSecuritiesWrapper>
  );
};

export default ViewCompletedSecurities;
