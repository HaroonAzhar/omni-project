import styled from "styled-components";
import { Link } from "react-router-dom";

import { lightBackgroundBlue, grey, darkGrey, errorColor } from "styles/colors";
import { big } from "styles/button_sizes";
import { DropDownButton } from "components/molecules";
import { Button, TextInput } from "components/atoms";

export const StyledBackground = styled.div`
  background: ${lightBackgroundBlue};
  height: 100%;
  min-height: 100vh;
  padding: 20px 10px 0 10px;
`;

export const StyledContainer = styled.div`
  background: white;
  border-radius: 20px;
  height: 100%;
  margin: 0 auto 10px;
  padding: 10px 10px 10px 30px;
  width: 1120px;
`;

export const StyledTitle = styled.h1`
  font-size: 24px;
`;

export const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 15px;
  width: 100%;
`;

export const StyledTableContainer = styled.div``;

export const StyledDropDownButton = styled(DropDownButton)`
  & > button {
    height: ${big};
    width: 210px;
    color: ${grey};
    border-color: ${grey};
  }

  & > button:focus {
    background: ${lightBackgroundBlue};
    border: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  height: ${big};
  justify-content: space-between;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  height: 100%;
  width: 46%;
`;

export const StyledModalTitle = styled.h1`
  color: ${darkGrey};
  font-size: 24px;
`;

export const StyledError = styled.span`
  color: ${errorColor};
  display: block;
  font-size: 14px;
  padding: 20px;
  text-align: center;
`;

export const StyledGroupOfHeaderInputs = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SearchInput = styled(TextInput)`
  margin-left: 0px;
  margin-right: 30px;
  top: 5px;
  width: 280px;

  & input::placeholder {
    font-size: 16px;
  }
`;

export const StyledGlobalLinksContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;
export const StyledGlobalLinks = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

export const StyledLink = styled(Link)`
  border-bottom: 1.5px solid transparent;
  font-size: 20px;
  margin: 0px 10px 0px 0px;
  outline: 0px solid red;
  padding: 6px;
  text-decoration: none;

  :focus {
    color: ${darkGrey};
    outline: none;
  }

  :hover {
    border-bottom: 1.5px solid ${darkGrey};
    color: ${darkGrey};
  }
`;
