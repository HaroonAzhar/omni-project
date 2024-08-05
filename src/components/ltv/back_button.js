import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Container = styled.div`
  margin-bottom: 2rem;
`;

const BackButton = ({ text = "Back to dashboard", url = "/" }) => {
  return (
    <Container>
      <StyledLink to={url}>
        <span className="icon-keyboard_arrow_left" />
        {text}
      </StyledLink>
    </Container>
  );
};

BackButton.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
};

export default BackButton;
