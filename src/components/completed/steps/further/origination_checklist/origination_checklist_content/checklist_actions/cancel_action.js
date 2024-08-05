import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, Modal, TextAreaInput, H2 } from "components/atoms";
import { dateFormat } from "utils";
import {
  ButtonsContainer,
  QuestionsWrapper,
} from "components/completed/steps/shared_styles/styled_filter";

import useActionContext from "./use_action_context";

const CancelAction = ({ further, readOnlyView = false }) => {
  const [comment, setComment] = useState("");
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  const onClose = () => setIsCancelModalVisible(false);
  const onOpen = () => setIsCancelModalVisible(true);

  const { user, request } = useActionContext(further);

  const details = further.originationChecklist.close;
  const textLabel = "Cancel Drawdown Request";
  if (details?.Date) {
    return (
      <div>
        Performed {textLabel} on: {dateFormat(details.Date)} by: {details.User}
      </div>
    );
  }
  if (readOnlyView) {
    return null;
  }

  return (
    <>
      <Modal isOpen={isCancelModalVisible} onClose={onClose}>
        <QuestionsWrapper>
          <H2>Confirm Cancel Drawdown Request</H2>
          <ButtonsContainer>
            <Button onClick={onClose} kind="secondary">
              Back
            </Button>
            <Button
              onClick={() => {
                request("close", {
                  User: user,
                  Date: new Date(),
                  Comment: comment,
                }).then((res) => {
                  if (res) {
                    onClose();
                  }
                });
              }}
            >
              Confirm
            </Button>
          </ButtonsContainer>
        </QuestionsWrapper>
      </Modal>
      <TextAreaInput
        input={{ onChange: (e) => setComment(e.target.value) }}
        label="Comment"
        meta={{}}
      />

      <Button onClick={onOpen}>{textLabel}</Button>
    </>
  );
};

CancelAction.propTypes = {
  further: PropTypes.object.isRequired,
  readOnlyView: PropTypes.bool,
};

export default CancelAction;
