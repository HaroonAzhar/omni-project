import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { camelize, parameterize } from "inflected";
import { useSelector } from "react-redux";

import {
  StyledBackground,
  StyledContainer,
  StyledTitle,
  StyledHeader,
  StyledTableContainer,
} from "components/pages/dashboard/styled_dashboard";
import { Button, Checkbox, Fieldset, TextInput } from "components/atoms";
import { convertToCompleted } from "utils/requests";
import { useInfoMessage } from "hooks";
import { StyledInfoBox } from "components/templates/dip_flow_template/styled_dip_flow";
import useCompletedData from "components/completed/use_completed_data";

const StyledDateField = styled(Field)`
  & input {
    width: 210px;
  }
  margin-bottom: 30px;
`;

const StyledAddStandardWaypoint = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-left: 30px;
  min-height: 105px;
`;

const WaypointDate = styled(Field)`
  & input {
    width: 210px;
  }
  margin-left: 30px;
`;

const AddStandardWaypoint = ({ label, values }) => {
  const name = camelize(parameterize(label, { separator: "_" }));
  return (
    <StyledAddStandardWaypoint>
      <Field component={Checkbox} type="checkbox" name={name} label={label} />
      {values[name] && (
        <WaypointDate
          component={TextInput}
          type="date"
          name={`${name}Date`}
          label="Custom Waypoint Due Date"
        />
      )}
    </StyledAddStandardWaypoint>
  );
};

AddStandardWaypoint.propTypes = {
  label: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
};

const automaticWaypoints = [
  "Add Waypoint For Redemption Due Date",
  "Add Waypoint For Send Standing Order Instruction",
  "Add Waypoint For Serviced Interest Payment Due",
  "Add Waypoint For Review Exit Strategy",
];

const ConvertToCompleted = () => {
  const { id } = useParams();
  const [infoMessage, setInfoMessage] = useInfoMessage();
  const history = useHistory();
  useCompletedData(() => {});
  const loanType = useSelector((state) => state.dip.LoanType);

  const validWaypoints = automaticWaypoints.filter((waypoint) => {
    if (loanType === "serviced") {
      return true;
    } else if (waypoint === "Add Waypoint For Serviced Interest Payment Due") {
      return false;
    }
    return true;
  });
  const submit = (values) => {
    convertToCompleted(id, values)
      .then(() => {
        setInfoMessage("Converted successfully");
        history.push(`/completed/${id}`);
      })
      .catch(() => {
        setInfoMessage("Conversion failed!");
      });
  };
  return (
    <StyledBackground>
      {infoMessage && <StyledInfoBox>{infoMessage}</StyledInfoBox>}

      <StyledContainer>
        <StyledHeader>
          <StyledTitle> Convert case to completed</StyledTitle>
        </StyledHeader>
        <StyledTableContainer>
          <Form
            onSubmit={submit}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <StyledDateField
                  component={TextInput}
                  type="date"
                  name="DateOfCompletion"
                  label="Date of completion"
                  validate={(value) => !value}
                />
                <Fieldset title="Automatic waypoints">
                  {validWaypoints.map((automaticWaypoint) => (
                    <AddStandardWaypoint
                      key={automaticWaypoint}
                      label={automaticWaypoint}
                      values={values}
                    />
                  ))}
                </Fieldset>
                <Button>Convert</Button>
              </form>
            )}
          />
        </StyledTableContainer>
      </StyledContainer>
    </StyledBackground>
  );
};

export default ConvertToCompleted;
