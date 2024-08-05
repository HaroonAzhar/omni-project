import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { popUpBasicCss } from "styles/global_blocks";
import { lightBackgroundBlue } from "styles/colors";
import { DeleteIcon, EditIcon } from "components/icons";
import theme from "core/theme";

const StyledContainer = styled.div`
  ${popUpBasicCss}
  background: white;
  width: 80px;
`;

const StyledOption = styled.button`
  background: none;
  height: 40px;
  width: 40px;

  &:hover {
    background: ${lightBackgroundBlue};
  }

  :disabled {
    background: none;
    :hover {
      background: none;
    }
  }
`;

const ContextMenu = ({ onDelete, onEdit }) => (
  <StyledContainer>
    <StyledOption onClick={onDelete} disabled={!onDelete}>
      <DeleteIcon stroke={!onDelete && theme.colors.shadow} />
    </StyledOption>
    <StyledOption onClick={onEdit} disabled={!onEdit}>
      <EditIcon stroke={!onEdit && theme.colors.shadow} />
    </StyledOption>
  </StyledContainer>
);

ContextMenu.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default ContextMenu;
