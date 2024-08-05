import React from "react";
import { titleize } from "inflected";

import { Button, H1, Modal } from "components/atoms";

import { FURTHER_DRAWDOWNS } from "../../completed_steps";
import {
  Background,
  ContentWrapper,
  StepContainer,
  TitleWrapper,
} from "../shared_styles";
import AddFurtherDrawdown from "./add_further_drawdown";
import ViewFurtherDrawdowns from "./view_further_drawdowns";
import ViewCurrentInformation from "./view_current_information";
import useAllFurtherDrawdownsData from "./use_all_further_drawdowns_data";
import ExpectedDrawdowns from "./expected_drawdowns";

const FurtherDrawdowns = () => {
  const {
    addDrawdownModalVisible,
    closeAdd,
    latestStatement,
    totalGDV,
    totalValuations,
    availableDrawdownFunds,
    securities,
    furtherDrawdowns,
    openAdd,
    fetchFurtherDrawdownsAndStore,
  } = useAllFurtherDrawdownsData();
  return (
    <Background>
      <Modal isOpen={addDrawdownModalVisible} onClose={closeAdd}>
        <AddFurtherDrawdown
          currentStatement={latestStatement}
          totalGDV={totalGDV}
          totalValuations={totalValuations}
          closeAdd={closeAdd}
          availableDrawdownFunds={availableDrawdownFunds}
        />
      </Modal>
      <ContentWrapper>
        <TitleWrapper>
          <H1>{titleize(FURTHER_DRAWDOWNS)}</H1>
        </TitleWrapper>
        <StepContainer>
          <div>
            <ViewCurrentInformation
              availableDrawdownFunds={availableDrawdownFunds}
              latestStatement={latestStatement}
              securities={securities}
            />

            <ViewFurtherDrawdowns
              furtherDrawdowns={furtherDrawdowns}
              fetchFurtherDrawdownsAndStore={fetchFurtherDrawdownsAndStore}
            />
            <Button onClick={openAdd}>Add New Drawdown</Button>

            <ExpectedDrawdowns />
          </div>
        </StepContainer>
      </ContentWrapper>
    </Background>
  );
};
export default FurtherDrawdowns;
