import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import { isEmpty } from "lodash";

import { rollbar } from "utils";
import { ContextMenu } from "components/molecules";
import useInfoMessage from "hooks/use_info_message";
import { useFetchAndStoreApplicants } from "components/application/helpers/hooks";
import { InfoBox } from "components/atoms";
import { removeApplicantAssetOrLiability } from "store/application/actions";

import useSavingRequest from "./use_saving_request";
import Inputs from "./inputs";
import {
  StyledForm,
  StyledInputsContainer,
  StyledButtonsContainer,
  StyledButton,
} from "./styles";
import netCalculator from "./net_calculator";

const AssetLiabilityRowContextMenu = ({
  indexOfElement,
  asset,
  indexOfAsset,
}) => {
  const dispatch = useDispatch();
  const [infoMessage, showInfoBox] = useInfoMessage();
  const [shouldShowInputs, setShouldShowInputs] = useState(isEmpty(asset));

  const sendInitialRequests = useFetchAndStoreApplicants({
    showInfoBox,
  });

  const sendRequest = useSavingRequest({
    indexOfElement,
    indexOfAsset,
  });

  const onDelete = () => {
    sendRequest({ toRemove: true })
      .then(() => {
        sendInitialRequests();
      })
      .catch((e) => {
        rollbar.error(e);
        showInfoBox("Removing row failed!");
      });
  };

  const onClickEdit = () => {
    setShouldShowInputs(true);
  };

  const onCancel = (e) => {
    e.preventDefault();

    if (isEmpty(asset)) {
      dispatch(removeApplicantAssetOrLiability(indexOfElement, indexOfAsset));
    }

    setShouldShowInputs(false);
  };

  const onSubmit = (values) => {
    sendRequest({ updateWithValues: values })
      .then(() => {
        setShouldShowInputs(false);
        sendInitialRequests();
      })
      .catch((e) => {
        rollbar.error(e);
        showInfoBox("Data saving failed!");
      });
  };

  return (
    <>
      {infoMessage && <InfoBox>{infoMessage}</InfoBox>}

      {shouldShowInputs && (
        <Form
          onSubmit={onSubmit}
          initialValues={asset}
          decorators={[netCalculator]}
          render={({ handleSubmit }) => {
            return (
              <StyledForm onSubmit={handleSubmit}>
                <StyledInputsContainer>
                  <Inputs />
                </StyledInputsContainer>

                <StyledButtonsContainer>
                  <StyledButton kind="secondary" onClick={onCancel}>
                    Cancel
                  </StyledButton>
                  <StyledButton>Save</StyledButton>
                </StyledButtonsContainer>
              </StyledForm>
            );
          }}
        />
      )}

      <ContextMenu onEdit={onClickEdit} onDelete={onDelete} />
    </>
  );
};

AssetLiabilityRowContextMenu.propTypes = {
  indexOfElement: PropTypes.number.isRequired,
  asset: PropTypes.object,
  indexOfAsset: PropTypes.number,
};

export default AssetLiabilityRowContextMenu;
