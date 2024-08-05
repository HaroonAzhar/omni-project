import { Field, useForm } from "react-final-form";
import React from "react";
import PropTypes from "prop-types";
import { OnChange } from "react-final-form-listeners";

import { CrossCircleButton, SelectInput } from "components/atoms";
import { AutoManualToggle } from "components/molecules";

import { StyledDirectorRow, StyledNO } from "./styled_form_1";

const DirectorRow = ({
  name,
  index,
  onRemove,
  synchronizeGuarantor,
  directorOptions,
}) => {
  const isGuarantorName = `${name}.is_guarantor`;
  const nameField = `${name}.name`;
  const form = useForm();
  return (
    <StyledDirectorRow>
      <StyledNO>{`${index + 1}.`}</StyledNO>

      <OnChange name={`${name}.fk_shared_contact_id`}>
        {(value) => {
          const [{ label }] = directorOptions.filter(
            (option) => option.value.toString() === value.toString()
          );
          form.change(nameField, label);
        }}
      </OnChange>

      <Field
        component={SelectInput}
        options={directorOptions}
        name={`${name}.fk_shared_contact_id`}
      />
      <AutoManualToggle name={isGuarantorName} />
      <OnChange name={isGuarantorName}>
        {(value) => synchronizeGuarantor(name, value)}
      </OnChange>

      <CrossCircleButton type="button" onClick={onRemove} />
    </StyledDirectorRow>
  );
};

DirectorRow.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  synchronizeGuarantor: PropTypes.func.isRequired,
  directorOptions: PropTypes.array.isRequired,
};

export default DirectorRow;
