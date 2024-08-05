import React from "react";
import PropTypes from "prop-types";
import { capitalize } from "inflected";

import { mapBooleanFieldToString } from "utils";

import {
  StepView,
  Rows,
  Column,
  ViewRowLeftRight,
  RenderSectionConditionally,
} from "../shared";
import { useExpandForStatus } from "./hooks";

const generateTitle = (companyName, phone, email) => {
  const companyNameText = capitalize(companyName ?? "");
  const phoneText = phone ?? "";
  const emailText = email ?? "";
  return ["Solicitor Details", companyNameText, phoneText, emailText]
    .filter(Boolean)
    .join(" - ");
};

const SolicitorDetailsView = ({
  solicitor_details,
  omniSolicitorAddress,
  status,
  expanded,
}) => {
  const isExpanded = useExpandForStatus(status, expanded, "New");

  return (
    <StepView
      title={generateTitle(
        solicitor_details?.company_name,
        solicitor_details?.phone_number,
        solicitor_details?.email
      )}
      status={status}
      expanded={isExpanded}
    >
      <RenderSectionConditionally status={status}>
        <Rows>
          <Column>
            <ViewRowLeftRight
              title="Firm Name:"
              value={solicitor_details?.company_name}
            />
            <ViewRowLeftRight
              title="Telephone:"
              value={solicitor_details?.phone_number}
            />
            <ViewRowLeftRight title="Email:" value={solicitor_details?.email} />
            <ViewRowLeftRight
              title="Address:"
              value={[
                [solicitor_details?.address_line_1],
                [solicitor_details?.address_line_2],
                [solicitor_details?.city],
                [solicitor_details?.postcode],
              ]}
              multi={true}
            />
            <ViewRowLeftRight
              title="Two Partners:"
              value={mapBooleanFieldToString(
                solicitor_details?.are_least_two_partners
              )}
            />
          </Column>
          <Column>
            <ViewRowLeftRight
              title="OMNI Solicitors:"
              value={omniSolicitorAddress?.Name}
            />
            <ViewRowLeftRight
              title="Telephone:"
              value={solicitor_details?.omni_solicitor_phone_number}
            />
            <ViewRowLeftRight
              title="Email:"
              value={solicitor_details?.omni_solicitor_email}
            />
            <ViewRowLeftRight
              title="Address:"
              value={[
                [omniSolicitorAddress?.Address?.Line1],
                [omniSolicitorAddress?.Address?.Line2],
                [omniSolicitorAddress?.Address?.TownCity],
                [omniSolicitorAddress?.Address?.PostCode],
              ]}
              multi={true}
            />
          </Column>
        </Rows>
      </RenderSectionConditionally>
    </StepView>
  );
};

SolicitorDetailsView.propTypes = {
  status: PropTypes.string,
  solicitor_details: PropTypes.object,
  omniSolicitorAddress: PropTypes.object,
  expanded: PropTypes.bool,
};

export default SolicitorDetailsView;
