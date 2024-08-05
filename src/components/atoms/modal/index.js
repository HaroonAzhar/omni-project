import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

import { alwaysOnTop } from "styles/z_indexes";
import { shadow } from "styles/colors";
import { CrossButton } from "components/atoms";

const customStyles = {
  content: {
    position: "relative",
    top: "0",
    left: "0",
    overflowY: "auto",
    overflowX: "hidden",
    borderRadius: "8px",
    border: "none",
    boxShadow: `0px 5px 14px ${shadow}`,
    padding: "35px",
  },
  overlay: {
    zIndex: alwaysOnTop,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment */
const Modal = ({ ...props }) => (
  <ReactModal
    onRequestClose={props.onClose}
    {...props}
    style={customStyles}
    appElement={document.querySelector("#root")}
  >
    <CrossButton onClick={props.onClose} />
    {props.children}
  </ReactModal>
);

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};
