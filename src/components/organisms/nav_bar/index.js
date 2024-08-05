import React from "react";
import styled from "styled-components/macro";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { shadow } from "styles/colors";
import { navBar } from "styles/z_indexes";
import { clearDipData } from "store/dip";

import UserData from "./user_data";

const StyledWrapper = styled.div`
  height: 60px;
`;

const StyledAppNavBar = styled.nav`
  background-color: ${({ theme }) => theme.colors.navBar ?? theme.colors.white};
  border-bottom: 2px;
  box-shadow: 0px 1px 5px ${shadow};
  display: flex;
  height: 60px;
  justify-content: center;
  position: fixed;
  width: 100%;
  z-index: ${navBar};
`;

const StyledNavBarContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: ${({ theme }) => theme.widths.internal};
`;

const StyledLogoLink = styled(Link)`
  color: inherit;
  font-size: 2em;
  line-height: 100%;
  text-decoration: none;
  width: 400px;
`;

const NavBar = () => {
  const dispatch = useDispatch();

  const clearStore = () => {
    dispatch(clearDipData());
  };

  return (
    <StyledWrapper>
      <StyledAppNavBar>
        <StyledNavBarContainer>
          <StyledLogoLink to="/?status=Active" onClick={clearStore}>
            {["Omni", process.env.REACT_APP_ENVIRONMENT_LABEL]
              .filter(Boolean)
              .join(" - ")}
          </StyledLogoLink>
          <UserData></UserData>
        </StyledNavBarContainer>
      </StyledAppNavBar>
    </StyledWrapper>
  );
};

export default NavBar;
