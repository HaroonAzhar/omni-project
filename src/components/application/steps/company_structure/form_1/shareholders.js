/* eslint-disable react/prop-types */
import React from "react";

import { Button, Fieldset } from "components/atoms";

import { StyledError } from "../../../../pages/dashboard/styled_dashboard";
import { breadcrumbPath, findParent } from "./helpers";
import ShareholderRow from "./shareholder_row";
import { InverseStyledButtonsContainer } from "./styled_form_1";
import SectionHeading from "./section_heading";
import AddCompanyShareholder from "./add_company_shareholder";
import AddIndividualShareholder from "./add_individual_shareholder";

const Shareholders = ({
  shareholdersStructureState,
  currentViewState,
  errors,
  handleSubmit,
  sharedHoldersDetails,
  sumError,
  synchronizeGuarantor,
  individualOptions,
}) => {
  const [
    sharedHoldersStructure,
    setSharedHoldersStructure,
  ] = shareholdersStructureState;
  const [currentView, setCurrentView] = currentViewState;

  const path = breadcrumbPath(
    sharedHoldersDetails,
    sharedHoldersStructure,
    currentView,
    setCurrentView,
    errors
  );

  const childUuids = sharedHoldersStructure[currentView];

  return (
    <Fieldset title={path}>
      <SectionHeading title="Shareholder" />
      {childUuids.map((uuid, index) => {
        return (
          <ShareholderRow
            key={uuid}
            uuid={uuid}
            index={index}
            handleRemove={(id) => {
              const copied = { ...sharedHoldersStructure };

              delete copied[id];
              copied[currentView] = copied[currentView].filter((k) => k !== id);

              setSharedHoldersStructure(copied);
            }}
            handleChangeStructure={(id) => {
              setCurrentView(id);
            }}
            synchronizeGuarantor={synchronizeGuarantor}
            individualOptions={individualOptions}
          />
        );
      })}

      {sumError && (
        <div>
          <StyledError>{sumError}</StyledError>
        </div>
      )}

      <AddIndividualShareholder
        currentView={currentView}
        setSharedHoldersStructure={setSharedHoldersStructure}
        sharedHoldersStructure={sharedHoldersStructure}
        individualsOptions={individualOptions}
      />
      <AddCompanyShareholder
        currentView={currentView}
        setSharedHoldersStructure={setSharedHoldersStructure}
        sharedHoldersStructure={sharedHoldersStructure}
      />

      {currentView !== "main" && (
        <InverseStyledButtonsContainer>
          <Button
            kind="fade"
            type="button"
            onClick={() => {
              let localErrors = 0;

              childUuids.forEach((id) => {
                localErrors += Object.keys(errors[id] || []).length;
              });

              if (localErrors === 0) {
                const parentId = findParent(
                  sharedHoldersStructure,
                  currentView
                );

                if (parentId) {
                  setCurrentView(parentId);
                }
              } else {
                handleSubmit();
              }
            }}
          >
            Up A Level
          </Button>
        </InverseStyledButtonsContainer>
      )}
    </Fieldset>
  );
};

export default Shareholders;
