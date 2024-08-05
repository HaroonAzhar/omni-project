import React from "react";

import { TextInput } from "components/atoms";

import { StyledField, StyledPriceField, StyledSelectInput } from "./styles";

const options = [
  { value: "", label: " " },
  {
    value: "vehicle",
    label: "Vehicle",
  },
  {
    value: "equities",
    label: "Equities/Investments",
  },
  {
    value: "other",
    label: "Personal effects/Other assets",
  },
  { value: "Car Loans" },
  { value: "Maintenance" },
  { value: "Overdrafts" },
  { value: "Credit Card Balances" },
  { value: "Business Loans" },
  { value: "Other Personal Loans" },
];

const Inputs = () => (
  <>
    <StyledField
      component={StyledSelectInput}
      type="text"
      label="Asset Type"
      name="type"
      options={options}
    />
    <StyledField
      component={TextInput}
      type="text"
      name="description"
      label="Description"
    />
    <StyledPriceField
      name="gross_value"
      label="Gross Value"
      placeholder="£££"
    />
    <StyledPriceField name="outstanding_debt" label="Debt" placeholder="£££" />
    <StyledPriceField
      name="net_value"
      label="Net Value"
      placeholder="£££"
      disabled={true}
    />
  </>
);

export default Inputs;
