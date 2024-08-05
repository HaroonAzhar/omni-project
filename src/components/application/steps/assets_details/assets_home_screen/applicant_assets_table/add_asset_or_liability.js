import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { addApplicantAsset } from "store/application/actions";
import { Button } from "components/atoms";

import useAssetsFlowPaths from "../../use_assets_flow_paths";

const StyledContainer = styled.div`
  align-content: center;
  display: flex;
  padding: 20px 0;
`;

const StyledButton = styled(Button)`
  margin-right: 20px;
`;

const AddAssetOrLiability = ({ indexOfElement }) => {
  const dispatch = useDispatch();
  const individuals = useSelector((store) => store.application.individuals);
  const numberOfProperties =
    indexOfElement !== undefined &&
    individuals[indexOfElement] &&
    individuals[indexOfElement]?.property_portfolio?.length;

  const { goToEditProperty } = useAssetsFlowPaths();

  const addEmptyRow = () => {
    dispatch(addApplicantAsset(indexOfElement));
  };

  return (
    <StyledContainer>
      <StyledButton onClick={() => addEmptyRow("assets")}>
        Add Asset
      </StyledButton>
      <StyledButton
        onClick={() => goToEditProperty(indexOfElement, numberOfProperties)}
      >
        Add Property
      </StyledButton>
    </StyledContainer>
  );
};

AddAssetOrLiability.propTypes = {
  indexOfElement: PropTypes.number.isRequired,
};

export default AddAssetOrLiability;
