import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import firebase from "firebase";

const StyledLogoutButton = styled.button`
  background-color: ${({ theme }) => theme.colors.navBar ?? theme.colors.white};
  height: 16px;
  margin-left: 20px;
  width: 16px;
`;

const UserData = () => {
  const { email } = useSelector((state) => state.user);

  const logoutClicked = () => {
    firebase.auth().signOut();
  };
  return (
    <div>
      {email}
      {email && (
        <StyledLogoutButton onClick={logoutClicked}>Logout</StyledLogoutButton>
      )}
    </div>
  );
};

UserData.propTypes = {};

export default UserData;
