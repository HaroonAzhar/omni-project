import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  justify-content: ${(props) => {
    switch (props.align) {
      case "right":
        return "flex-end";

      case "center":
        return "center";

      default:
        return "flex-start";
    }
  }};
`;

Container.propTypes = {
  align: PropTypes.string,
};

export default Container;
