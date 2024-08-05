import React from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { Form } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { SelectInput } from "components/atoms";

import DashboardCaseActions from "../dashboard_case_actions";
import {
  StyledFilterRow,
  StyledSelectInputField,
  StyledFiltersContainer,
} from "./styled_dashboard_table_filters";
import phaseFilterOptions from "./phase_filter_options";
import statusFilterOptions from "./status_filter_options";
import useUsers from "../hooks/use_users";

const DashboardTableFilters = ({
  existingParams,
  selectedStatus,
  selectedPhase,
  setSelectedStatus,
  setSelectedPhase,
  selectedUser,
  setSelectedUser,
  updateSearchString,
}) => {
  const { push } = useHistory();
  const location = useLocation();

  const users = useUsers();

  const initialValues = {
    filterstatus: selectedStatus,
    filterphase: selectedPhase,
    filteruser: selectedUser,
  };

  const onSubmit = () => {};

  const setParamFilters = (value, setValue, name) => {
    setValue(value);
    const paramStr = value.split(" ").join("_");

    const queryParamsVar = new URLSearchParams({
      ...existingParams,
      [name]: paramStr,
    });

    if (queryParamsVar.has(name)) {
      if (value === "") {
        queryParamsVar.delete(name);
      }
    }

    push({
      pathname: location.pathname,
      search: queryParamsVar.toString(),
    });
  };

  return (
    <StyledFiltersContainer>
      <div>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <StyledFilterRow>
                <StyledSelectInputField
                  component={SelectInput}
                  type="text"
                  label="Status"
                  name="filterstatus"
                  options={statusFilterOptions}
                />
                <OnChange name="filterstatus">
                  {(value) =>
                    setParamFilters(value, setSelectedStatus, "status")
                  }
                </OnChange>
                <StyledSelectInputField
                  component={SelectInput}
                  type="text"
                  label="Phase"
                  name="filterphase"
                  options={phaseFilterOptions}
                />
                <OnChange name="filterphase">
                  {(value) => setParamFilters(value, setSelectedPhase, "phase")}
                </OnChange>
                <StyledSelectInputField
                  component={SelectInput}
                  type="text"
                  label="User"
                  name="filteruser"
                  options={users}
                />
                <OnChange name="filteruser">
                  {(value) => setParamFilters(value, setSelectedUser, "user")}
                </OnChange>
              </StyledFilterRow>
            </form>
          )}
        />
      </div>
      <DashboardCaseActions updateSearchString={updateSearchString} />
    </StyledFiltersContainer>
  );
};

DashboardTableFilters.propTypes = {
  existingParams: PropTypes.object,
  selectedStatus: PropTypes.string,
  selectedPhase: PropTypes.string,
  selectedUser: PropTypes.string,
  setSelectedPhase: PropTypes.func.isRequired,
  setSelectedStatus: PropTypes.func.isRequired,
  updateSearchString: PropTypes.func.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
};

export default DashboardTableFilters;
