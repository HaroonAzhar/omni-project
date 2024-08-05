import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { InfoBox } from "components/atoms";
import { useFetchAndStoreApplicants } from "components/application/helpers/hooks";
import { rollbar, getIndividualTitle, getPropertyAddress } from "utils";
import { ContextMenu } from "components/molecules";
import { useInfoMessage } from "hooks";
import { DeletingModal } from "components/organisms";

import useAssetsFlowPaths from "../../use_assets_flow_paths";
import usePatchApplicantPortfolio from "../../use_patch_applicant_portfolio";

const StyledDeletingModal = styled(DeletingModal)`
  background: white;
  width: 600px;
`;

const PropertyRowContextMenu = ({ indexOfProperty, indexOfElement }) => {
  const { id } = useParams();
  const patchApplicantPortfolio = usePatchApplicantPortfolio(id);
  const individuals =
    useSelector((state) => state.application.individuals) || [];
  const [infoMessage, showInfoBox] = useInfoMessage();
  const [shouldShowDeletingModal, setShouldShowDeletingModal] = useState();
  const { goToEditProperty } = useAssetsFlowPaths();

  const individual = individuals[indexOfElement];
  const propertyAddress = getPropertyAddress(
    individual.property_portfolio[indexOfProperty]
  );
  const applicantName = getIndividualTitle(individual);

  const getApplicants = useFetchAndStoreApplicants({
    showInfoBox,
  });

  const onEdit = () => goToEditProperty(indexOfElement, indexOfProperty);
  const onDelete = () => setShouldShowDeletingModal(true);

  const deleteProperty = () => {
    const applicant = { ...individual };
    applicant.property_portfolio.splice(indexOfProperty, 1);

    patchApplicantPortfolio(applicant)
      .then(() => {
        setShouldShowDeletingModal(false);
        getApplicants();
      })
      .catch((e) => {
        rollbar.error(e);
        showInfoBox("Removing applicant property failed!");
      });
  };

  return (
    <>
      {infoMessage && <InfoBox>{infoMessage}</InfoBox>}

      <StyledDeletingModal
        content={`Do you want to delete property: "${propertyAddress}" from ${applicantName} property portfolio?`}
        isModalShowed={shouldShowDeletingModal}
        hideModal={() => setShouldShowDeletingModal()}
        isError={false}
        sendDeletingRequest={deleteProperty}
      />

      <ContextMenu onEdit={onEdit} onDelete={onDelete} />
    </>
  );
};

PropertyRowContextMenu.propTypes = {
  indexOfProperty: PropTypes.number.isRequired,
  indexOfElement: PropTypes.number.isRequired,
};

export default PropertyRowContextMenu;
