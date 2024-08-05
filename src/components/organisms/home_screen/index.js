import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { humanize, titleize } from "inflected";

import { Button } from "components/atoms";
import { Table, BackToChecklistButton } from "components/molecules";
import {
  StyledBackground,
  StyledContainer,
  StyledTitle,
  StyledHeader,
  StyledTableContainer,
} from "components/pages/dashboard/styled_dashboard";
import LOCALE from "core/locale";

const StyledHomeScreenHeader = styled(StyledHeader)`
  flex-wrap: wrap;
`;

const StyledHomeScreenTitle = styled(StyledTitle)`
  margin-bottom: 1em;
  width: 100%;
`;

const columns = (name, additionalColumn) => {
  const columnsObjects = [
    {
      Header: `${humanize(name)}`,
      accessor: "index",
    },
    {
      Header: "",
      accessor: "name",
    },
    {
      Header: "Date edited",
      accessor: "date_edited",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    additionalColumn && {
      Header: "",
      accessor: additionalColumn,
    },
    {
      Header: "",
      accessor: "delete",
    },
    {
      Header: "",
      accessor: "edit",
    },
  ];
  return columnsObjects.filter((columnObject) => columnObject);
};

const HomeScreen = ({
  className,
  allowAdd,
  step_id,
  name,
  elementName,
  nameGetter,
  additionalColumn,
  addPath,
  nextStepName,
  detailsName,
  canBeNotReady = false,
  onDelete = undefined,
}) => {
  const applicationData = useSelector((state) => state.application);
  const elements = applicationData[name];
  const history = useHistory();
  const { id } = useParams();

  const applicationHomePagePath = `/application/${id}`;
  const stepHomePagePath = `${applicationHomePagePath}/checklist/${step_id}`;
  const goBackToChecklist = () => {
    history.push(applicationHomePagePath);
  };
  const goToNextFlow = () => {
    history.push(`${applicationHomePagePath}/checklist/${nextStepName}`);
  };
  const goToElementEdit = (indexOfElement) => {
    history.push(`${stepHomePagePath}/0/${indexOfElement}`);
  };

  const addNewElementToListAndGoToEdit = () =>
    goToElementEdit(elementsData.length);

  const goToAlternativeAddPath = () => history.push(addPath);

  const addElement = () => {
    if (addPath) {
      goToAlternativeAddPath();
    } else {
      addNewElementToListAndGoToEdit();
    }
  };

  const goToElementAdditionalDetails = (indexOfElement) => {
    history.push(`${stepHomePagePath}/${indexOfElement}/${additionalColumn}`);
  };

  const elementsData =
    (elements &&
      elements.map((element, index) => {
        const details = detailsName ? element[detailsName] || {} : element;
        const elementRepr = {
          index: index + 1,
          name: nameGetter(element),
          status: details.status,
          date_edited:
            details.date_edited &&
            new Date(details.date_edited).toLocaleDateString(LOCALE),
          edit:
            ((!element.notReady || !canBeNotReady) && (
              <Button
                kind="secondary"
                type="button"
                onClick={() => goToElementEdit(index)}
              >
                Edit
              </Button>
            )) ||
            `${titleize(name)} details not completed`,
          delete: onDelete && (
            <Button
              kind="secondary"
              type="button"
              onClick={() => {
                onDelete(element);
              }}
            >
              Delete
            </Button>
          ),
        };
        elementRepr[additionalColumn] = (
          <Button
            kind="extra"
            type="button"
            onClick={() => goToElementAdditionalDetails(index)}
          >
            {humanize(additionalColumn)}
          </Button>
        );
        return elementRepr;
      })) ||
    [];
  return (
    <StyledBackground>
      <StyledContainer>
        <StyledHomeScreenHeader>
          <StyledHomeScreenTitle>{humanize(step_id)}</StyledHomeScreenTitle>
          <BackToChecklistButton
            kind="extra"
            type="button"
            onClick={goBackToChecklist}
          >
            &lt; Back to the Application
          </BackToChecklistButton>

          {nextStepName && (
            <BackToChecklistButton
              kind="extra"
              type="button"
              onClick={goToNextFlow}
            >
              Go to the next flow &gt;
            </BackToChecklistButton>
          )}
        </StyledHomeScreenHeader>
        <StyledTableContainer>
          <Table
            columns={columns(elementName, additionalColumn)}
            data={elementsData}
            shouldShowHeaders={true}
            className={className}
          />
        </StyledTableContainer>
        {allowAdd && (
          <Button kind="extra" type="button" onClick={addElement}>
            + Add another {elementName}
          </Button>
        )}
      </StyledContainer>
    </StyledBackground>
  );
};

export default HomeScreen;

HomeScreen.propTypes = {
  className: PropTypes.string,
  allowAdd: PropTypes.bool,
  step_id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  elementName: PropTypes.string.isRequired,
  nameGetter: PropTypes.func.isRequired,
  additionalColumn: PropTypes.string,
  addPath: PropTypes.string,
  nextStepName: PropTypes.string,
  detailsName: PropTypes.string,
  canBeNotReady: PropTypes.bool,
  onDelete: PropTypes.func,
};
