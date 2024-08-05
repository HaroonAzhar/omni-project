/* eslint-disable react/prop-types */
import { Field, useField } from "react-final-form";
import React from "react";
import { OnChange } from "react-final-form-listeners";

import { AutoManualToggle } from "components/molecules";
import { removeWhitespaces } from "utils";
import {
  Button,
  SelectInput,
  TextInput,
  CrossCircleButton,
} from "components/atoms";

import {
  StyledDirectorRow,
  StyledNO,
  StyledPercentField,
} from "./styled_form_1";

const ShareholderRow = ({
  uuid,
  index,
  handleRemove,
  handleChangeStructure,
  synchronizeGuarantor,
}) => {
  const namePrefix = `shared_holders.${uuid}`;
  const isCompany = useField(`${namePrefix}.isCompany`);
  const name = useField(`${namePrefix}.name`);

  const isGuarantorName = `${namePrefix}.is_guarantor`;

  return (
    <StyledDirectorRow larger>
      <StyledNO>{`${index + 1}.`}</StyledNO>

      <Field
        component={TextInput}
        type="text"
        parse={removeWhitespaces}
        name={`shared_holders.${uuid}.name`}
        disabled={true}
      />

      <Field
        render={() => null}
        name={`shared_holders.${uuid}.fk_shared_contact_id`}
      />

      <Field
        render={() => null}
        name={`shared_holders.${uuid}.company_number`}
      />

      <AutoManualToggle
        name={isGuarantorName}
        disabled={isCompany.input.value === "true"}
        initialValue={true}
      />
      <OnChange name={isGuarantorName}>
        {(value) => synchronizeGuarantor(namePrefix, value)}
      </OnChange>

      <StyledPercentField
        name={`shared_holders.${uuid}.held`}
        placeholder="%"
      />

      <CrossCircleButton
        type="button"
        onClick={() => {
          handleRemove(uuid);
        }}
      />

      <Field
        name={`shared_holders.${uuid}.isCompany`}
        type="select"
        component={SelectInput}
        options={[
          {
            value: false,
            label: "as individual",
          },
          {
            value: true,
            label: "as company",
          },
        ]}
        disabled={true}
      />

      {isCompany.input.value === "true" && (
        <Button
          kind="fade"
          type="button"
          onClick={() => {
            handleChangeStructure(uuid);
          }}
          disabled={!!name.meta.error}
        >
          Change structure
        </Button>
      )}
    </StyledDirectorRow>
  );
};

export default ShareholderRow;
