import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";
import styled from "styled-components";

import { clearDipData } from "store/dip";
import { Modal, Button } from "components/atoms";
import { primaryButton } from "styles/global_blocks";
import { big } from "styles/button_sizes";
import { darkGrey } from "styles/colors";
import { ReactComponent as DownloadIcon } from "images/icons/download.svg";
import { capitalize } from "utils";

import DipPdf from "../../pages/dip_flow/pdf";

const StyledDownloadButton = styled(PDFDownloadLink)`
  ${primaryButton}
  height: 100%;
  width: 46%;
`;

const StyledButton = styled(Button)`
  height: 100%;
  width: 46%;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  height: ${big};
  justify-content: space-between;
  width: 100%;
  ${({ shouldCenter }) => shouldCenter && "justify-content: center;"}
`;

const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 195px;
  justify-content: center;
  text-align: center;
  width: 475px;
`;

const StyledTitle = styled.h1`
  color: ${darkGrey};
  font-size: 24px;
  margin-bottom: 60px;
`;

const StyledIconWrapper = styled.span`
  padding-left: 10px;
  position: relative;
`;

const StyledDownloadIcon = styled(DownloadIcon)`
  position: absolute;
  top: -0.7em;
`;

const FinalPopup = ({ isOpen, onClose, skipGeneratePdf, caseStage }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const dipData = useSelector((state) => state.dip);
  const calculatorStore = useSelector((state) => state.calculator);
  const caseData = useSelector((state) => state.case);

  const returnToDashboard = () => {
    dispatch(clearDipData());
    history.push("/");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledDiv>
        <StyledTitle>
          {`${capitalize(caseStage)} form completed successfully!`}
        </StyledTitle>

        <StyledButtonsContainer shouldCenter={skipGeneratePdf}>
          <StyledButton onClick={returnToDashboard} kind="secondary">
            Return to dashboard
          </StyledButton>

          {!skipGeneratePdf && (
            <StyledDownloadButton
              document={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <DipPdf
                  data={{ ...dipData, ...calculatorStore, ...caseData }}
                />
              }
              fileName="DIP PDF.pdf"
            >
              {({ loading }) =>
                loading ? (
                  "Loading PDF..."
                ) : (
                  <>
                    Download PDF
                    <StyledIconWrapper>
                      <StyledDownloadIcon />
                    </StyledIconWrapper>
                  </>
                )
              }
            </StyledDownloadButton>
          )}
        </StyledButtonsContainer>
      </StyledDiv>
    </Modal>
  );
};

export default FinalPopup;

FinalPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  skipGeneratePdf: PropTypes.bool,
  caseStage: PropTypes.string.isRequired,
};
