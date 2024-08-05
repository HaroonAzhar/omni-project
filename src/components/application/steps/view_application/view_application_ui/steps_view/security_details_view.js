import React from "react";
import PropTypes from "prop-types";

import { currencyFormat, escapeTitlize, mapBooleanFieldToString } from "utils";

import {
  StepView,
  Columns,
  Rows,
  Column,
  ViewRowLeftRight,
  RenderSectionConditionally,
} from "../shared";
import { useExpandForStatus } from "./hooks";

const getContactDetailsValuationDirectly = (forWhat) => (property) => {
  return `${escapeTitlize(
    property?.details?.[`contact_for_${forWhat}_valuation_name`]
  )} - ${escapeTitlize(
    property?.details?.[`contact_for_${forWhat}_valuation_email`]
  )} - ${escapeTitlize(
    property?.details?.[`contact_for_${forWhat}_valuation_phone`]
  )}`;
};

const getContactDetailsFromApplicant = (forWhat) => (individuals, property) => {
  const contactApplicantId = parseInt(
    property?.details?.[
      `selected_contact_applicant_id_for_${forWhat}_valuation`
    ]
  );
  const [contactApplicant] = individuals?.filter(
    (applicant) => applicant?.applicant_id === contactApplicantId
  );

  return `${escapeTitlize(
    contactApplicant?.personal_data?.forename
  )} ${escapeTitlize(contactApplicant?.personal_data?.surname)} - ${
    contactApplicant?.contact?.email
  } - ${contactApplicant?.contact?.home_phone}`;
};

const contactDetailsValuation = (forWhat) => (individuals, property) => {
  if (
    property?.details?.[`selected_contact_for_${forWhat}_valuation`] ===
    "applicant"
  ) {
    return getContactDetailsFromApplicant(forWhat)(individuals, property);
  }
  return getContactDetailsValuationDirectly(forWhat)(property);
};

const contactDetailsAccessValuation = contactDetailsValuation("access");
const contactDetailsPaymentValuation = contactDetailsValuation("payment");

const contactDetailsPaymentValuationWithSame = (individuals, property) => {
  if (property?.details?.payment_contact_details_same_as_access_valuation) {
    return contactDetailsAccessValuation(individuals, property);
  }

  return contactDetailsPaymentValuation(individuals, property);
};

const contactDetailsAccessValuationWithSame = (individuals, property) => {
  if (property?.details?.payment_contact_details_same_as_access_valuation) {
    return `As Valuation`;
  }

  return contactDetailsAccessValuation(individuals, property);
};

const currentlyOccupied = (isOccupied, basisForOccupation) => {
  const isOccupiedText = mapBooleanFieldToString(isOccupied) ?? "";
  const basisForOccupationText = basisForOccupation ?? "";

  return [isOccupiedText, basisForOccupationText].filter(Boolean).join(" - ");
};

const SecurityDetailsItem = ({ individuals, property, status, expanded }) => {
  const isExpanded = useExpandForStatus(status, expanded, "New");

  return (
    <Columns>
      <StepView
        title={`${escapeTitlize(property?.address?.line_1)}, ${escapeTitlize(
          property?.address?.city
        )}, ${escapeTitlize(property?.address?.postcode)} - ${currencyFormat(
          property?.details?.current_value
        )} - ${escapeTitlize(property?.details?.security_type)}`}
        status={status}
        expanded={isExpanded}
      >
        <RenderSectionConditionally status={status}>
          <Rows>
            <Column>
              <ViewRowLeftRight
                title="Owned:"
                value={mapBooleanFieldToString(
                  property?.details?.already_owned
                )}
              />
              <ViewRowLeftRight
                title="Being Purchased:"
                value={mapBooleanFieldToString(
                  property?.details?.being_purchased
                )}
              />
              <ViewRowLeftRight
                title="Est. Current Value:"
                value={currencyFormat(property?.details?.current_value)}
              />
              <ViewRowLeftRight
                title="Est. Value after Work:"
                value={currencyFormat(property?.details?.being_purchased)}
              />
              <ViewRowLeftRight
                title="Purchase Price:"
                value={currencyFormat(property?.details?.purchase_price)}
              />
              <ViewRowLeftRight
                title="Charged Offered:"
                value={escapeTitlize(property?.charge?.opfl_charge_type)}
              />
              <ViewRowLeftRight
                title="Security Owner:"
                value={escapeTitlize(property?.charge?.security_owner)}
              />
              <ViewRowLeftRight
                title="Contact Details (Valuation):"
                value={contactDetailsPaymentValuationWithSame(
                  individuals,
                  property
                )}
              />
              <ViewRowLeftRight
                title="Contact Details (Access):"
                value={contactDetailsAccessValuationWithSame(
                  individuals,
                  property
                )}
              />
            </Column>
            <Column>
              <ViewRowLeftRight
                title="Property Type:"
                value={escapeTitlize(property?.details?.property_type)}
              />
              <ViewRowLeftRight
                title="Security Type:"
                value={escapeTitlize(property?.details?.security_type)}
              />
              <ViewRowLeftRight
                title="Is of Standard Construction:"
                value={mapBooleanFieldToString(
                  property?.details?.is_standard_construction
                )}
              />
              <ViewRowLeftRight
                title="Is a New Build:"
                value={mapBooleanFieldToString(property?.details?.is_new_build)}
              />
              <ViewRowLeftRight
                title="Is Planning Permission Required:"
                value={mapBooleanFieldToString(
                  property?.details?.is_planning_required
                )}
              />
              <ViewRowLeftRight
                title="Is Currently Occupied:"
                value={currentlyOccupied(
                  property?.details?.is_occupied,
                  property?.details?.basis_for_occupation
                )}
              />
            </Column>
          </Rows>
        </RenderSectionConditionally>
      </StepView>
    </Columns>
  );
};

const SecurityDetailsView = ({ individuals, properties, status, expanded }) => {
  const isExpanded = useExpandForStatus(status, expanded, "New");

  return (
    <StepView title="Security Details" status={status} expanded={isExpanded}>
      <RenderSectionConditionally status={status}>
        {properties?.map((property) => {
          return (
            <SecurityDetailsItem
              key={property.id}
              property={property}
              status={property.status}
              expanded={expanded}
              individuals={individuals}
            />
          );
        })}
      </RenderSectionConditionally>
    </StepView>
  );
};

SecurityDetailsItem.propTypes = {
  status: PropTypes.string,
  property: PropTypes.object,
  individuals: PropTypes.array,
  expanded: PropTypes.bool,
};
SecurityDetailsView.propTypes = {
  status: PropTypes.string,
  properties: PropTypes.array,
  individuals: PropTypes.array,
  expanded: PropTypes.bool,
};

export default SecurityDetailsView;
