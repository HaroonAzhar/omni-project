import React from "react";
import { titleize } from "inflected";

import { Button, H1, Modal } from "components/atoms";

import { FURTHER_ADVANCES } from "../../completed_steps";
import {
  Background,
  ContentWrapper,
  StepContainer,
  TitleWrapper,
} from "../shared_styles";
import ViewCurrentInformation from "./view_current_information";
import useAllFurtherAdvancesData from "./use_all_further_advances_data";
import AddFurtherAdvance from "./add_further_advance";
import ViewFurtherAdvances from "./view_further_advances";

const FurtherAdvances = () => {
  const {
    addAdvanceModalVisible,
    TotalLoanFacility,
    closeAdd,
    latestStatement,
    totalGDV,
    totalValuations,
    availableDrawdownFunds,
    securities,
    furtherAdvances,
    openAdd,
    fetchFurtherAdvancesAndStore,
  } = useAllFurtherAdvancesData();
  return (
    <Background>
      <Modal isOpen={addAdvanceModalVisible} onClose={closeAdd}>
        <AddFurtherAdvance
          currentStatement={latestStatement}
          totalGDV={totalGDV}
          totalValuations={totalValuations}
          closeAdd={closeAdd}
          availableDrawdownFunds={availableDrawdownFunds}
        />
      </Modal>
      <ContentWrapper>
        <TitleWrapper>
          <H1>{titleize(FURTHER_ADVANCES)}</H1>
        </TitleWrapper>
        <StepContainer>
          <div>
            <ViewCurrentInformation
              originalLoanFacility={TotalLoanFacility}
              latestStatement={latestStatement}
              securities={securities}
            />

            <ViewFurtherAdvances
              furtherAdvances={furtherAdvances}
              fetchFurtherAdvancesAndStore={fetchFurtherAdvancesAndStore}
            />
            <Button onClick={openAdd}>Add New Advance</Button>
          </div>
        </StepContainer>
      </ContentWrapper>
    </Background>
  );
};
export default FurtherAdvances;
