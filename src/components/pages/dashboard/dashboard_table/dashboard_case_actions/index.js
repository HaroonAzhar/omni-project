import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button } from "components/atoms";
import { clearDipData } from "store/dip";
import { createDip, createCase } from "utils/requests";

import {
  StyledActionsContainer,
  StyledSearchContainer,
  StyledActionButtonsContainer,
} from "./styled_case_actions";
import { SearchInput } from "../../styled_dashboard";

const DashboardCaseActions = ({ updateSearchString, searchingString }) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const openDocumentPage = (typeOfDocument) => {
    dispatch(clearDipData());
    switch (typeOfDocument) {
      case "dip": {
        createCase().then(({ data: caseData }) => {
          createDip(caseData.id).then(({ data }) => {
            const { id } = data;
            history.push(`${typeOfDocument}/${id}/0`);
          });
        });
        break;
      }
      case "enquiry": {
        history.push(`${typeOfDocument}`);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <StyledActionsContainer>
      <StyledSearchContainer>
        <SearchInput
          input={{
            type: "text",
            value: searchingString,
            name: "searching_string",
            onChange: (e) => updateSearchString(e.target.value),
          }}
          label=""
          placeholder="Search"
          meta={{}}
        />
      </StyledSearchContainer>
      <StyledActionButtonsContainer>
        <Button kind="action" onClick={() => openDocumentPage("enquiry")}>
          Add Enquiry
        </Button>
        <Button kind="action" onClick={() => openDocumentPage("dip")}>
          Add DIP
        </Button>
      </StyledActionButtonsContainer>
    </StyledActionsContainer>
  );
};

DashboardCaseActions.propTypes = {
  searchingString: PropTypes.string,
  updateSearchString: PropTypes.func.isRequired,
};

export default DashboardCaseActions;
