import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { deleteApplicant } from "utils/requests";
import { Button, H2, Modal } from "components/atoms";
import { StyledButtonsContainer } from "components/dip_forms_steps/styled_dip_steps";
import {
  getIndividualTitleWithMiddleName,
  useRequestWithProgressToastRollbar,
} from "utils";

import HomeScreen from "../home_screen";

const DeleteApplicant = ({ applicant, closeDelete }) => {
  const { id } = useParams();

  const deleteRequest = useRequestWithProgressToastRollbar(
    deleteApplicant,
    "Delete Applicant"
  );

  const history = useHistory();
  const refreshPage = () => {
    history.go(0);
  };
  return (
    <Modal isOpen={applicant !== undefined} onClose={closeDelete}>
      <H2>
        Do you want to delete applicant{" "}
        {getIndividualTitleWithMiddleName(applicant)}
      </H2>

      <StyledButtonsContainer>
        <Button onClick={closeDelete}>Cancel</Button>
        <Button
          kind="secondary"
          onClick={() =>
            deleteRequest({
              id,
              applicant,
              applicantType: "individual",
            }).then((res) => {
              if (res) {
                refreshPage();
              }
            })
          }
        >
          Delete
        </Button>
      </StyledButtonsContainer>
    </Modal>
  );
};

DeleteApplicant.propTypes = {
  applicant: PropTypes.object,
  closeDelete: PropTypes.func.isRequired,
};

const ApplicantsHomeScreen = ({
  allowModifications,
  step_id,
  additionalColumn,
  nextStepName,
  detailsName,
  canBeNotReady,
}) => {
  const { type_of_applicant: typeOfApplicant } = useSelector(
    (state) => state.application
  );
  const [elementName, setElementName] = useState("Applicant");
  const [applicantToDelete, setApplicantToDelete] = useState(undefined);
  const closeDelete = () => setApplicantToDelete(undefined);

  useEffect(() => {
    setElementName(
      typeOfApplicant === "individual" ? "Applicant" : "Director/Shareholder"
    );
  }, [typeOfApplicant]);

  return (
    <>
      <DeleteApplicant
        applicant={applicantToDelete}
        closeDelete={closeDelete}
      />
      <HomeScreen
        allowAdd={allowModifications && typeOfApplicant === "company"}
        step_id={step_id}
        name="individuals"
        elementName={elementName}
        nameGetter={(applicant) =>
          `${applicant.personal_data.forename} ${applicant.personal_data.surname}`
        }
        additionalColumn={additionalColumn}
        nextStepName={nextStepName}
        detailsName={detailsName}
        canBeNotReady={canBeNotReady}
        onDelete={
          allowModifications &&
          typeOfApplicant === "company" &&
          setApplicantToDelete
        }
      />
    </>
  );
};

export default ApplicantsHomeScreen;

ApplicantsHomeScreen.propTypes = {
  allowModifications: PropTypes.bool.isRequired,
  step_id: PropTypes.string.isRequired,
  additionalColumn: PropTypes.string,
  nextStepName: PropTypes.string,
  detailsName: PropTypes.string,
  canBeNotReady: PropTypes.bool,
};
