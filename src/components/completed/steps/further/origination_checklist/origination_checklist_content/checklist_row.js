import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { titleize } from "inflected";

import { useRequestWithProgressToastRollbar } from "utils";
import { useUser } from "hooks";

import {
  ChecklistRowChildren,
  ChecklistRowDescription,
  ChecklistRowTitle,
  ChecklistRowWrapper,
  ChecklistRowSignature,
} from "./styled_origination_checklist";
import signatures from "./signatures";
import SignButton from "./sign_button";
import { useRequests } from "../../view_further_context";

const ChecklistRow = ({ section, description, further, render }) => {
  const { originationChecklist = {} } = further;
  const { id } = useParams();
  const user = useUser();

  const sectionData = originationChecklist[section];
  const {
    fetchFurtherAndStore,
    saveOriginationChecklistSection,
    updateOriginationChecklistSection,
    furtherIdKey,
  } = useRequests();

  const checklistRequest = (requestFunction) => (key, values) =>
    requestFunction(section)(id, further[furtherIdKey], key, values).then(
      (res) => {
        if (!res) {
          return;
        }
        fetchFurtherAndStore();
      }
    );

  const request = useRequestWithProgressToastRollbar(
    checklistRequest(saveOriginationChecklistSection)
  );
  const updatingRequest = useRequestWithProgressToastRollbar(
    checklistRequest(updateOriginationChecklistSection)
  );
  return (
    <ChecklistRowWrapper>
      <ChecklistRowTitle>{titleize(section)}</ChecklistRowTitle>
      <ChecklistRowDescription>{description}</ChecklistRowDescription>

      <SignButton
        request={request}
        sectionData={sectionData}
        user={user}
        signature={signatures[0]}
      />
      <>
        {sectionData[signatures[0]] ? (
          <SignButton
            request={request}
            sectionData={sectionData}
            user={user}
            signature={signatures[1]}
          />
        ) : (
          <ChecklistRowSignature></ChecklistRowSignature>
        )}
      </>
      <ChecklistRowChildren>
        {render &&
          render({ savingRequest: request, sectionData, updatingRequest })}
      </ChecklistRowChildren>
    </ChecklistRowWrapper>
  );
};

ChecklistRow.propTypes = {
  further: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
  description: PropTypes.string,
  render: PropTypes.func,
};

export default ChecklistRow;
