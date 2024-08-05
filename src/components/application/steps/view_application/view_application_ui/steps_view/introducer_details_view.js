import React from "react";
import PropTypes from "prop-types";
import { capitalize } from "inflected";

import {
  StepView,
  Rows,
  Column,
  ViewRowLeftRight,
  ViewRowMulti,
  RenderSectionConditionally,
} from "../shared";
import { useExpandForStatus } from "./hooks";

const generateTitle = (introducer, firm) => {
  const introducerText = capitalize(introducer ?? "");
  const firmText = capitalize(firm ?? "");
  return ["Broker", introducerText, firmText].filter(Boolean).join(" - ");
};

const IntroducerDetailsView = ({ introducer_details, status, expanded }) => {
  const isExpanded = useExpandForStatus(status, expanded, "New");

  return (
    <StepView
      title={generateTitle(
        introducer_details?.introducer,
        introducer_details?.firm
      )}
      status={status}
      expanded={isExpanded}
    >
      <RenderSectionConditionally status={status}>
        <Rows>
          <Column>
            <ViewRowLeftRight
              title="Company:"
              value={introducer_details?.firm}
            />
            <ViewRowLeftRight
              title="Name:"
              value={introducer_details?.introducer}
            />
            <ViewRowLeftRight
              title="Email:"
              value={introducer_details?.email}
            />
          </Column>
          <Column>
            <ViewRowMulti
              title="Address:"
              value={[
                [introducer_details?.address_line_1],
                [introducer_details?.address_line_2],
                [introducer_details?.city],
                [introducer_details?.postcode],
              ]}
              multi={true}
            />
          </Column>
        </Rows>
      </RenderSectionConditionally>
    </StepView>
  );
};

IntroducerDetailsView.propTypes = {
  status: PropTypes.string,
  introducer_details: PropTypes.object,
  expanded: PropTypes.bool,
};

export default IntroducerDetailsView;
