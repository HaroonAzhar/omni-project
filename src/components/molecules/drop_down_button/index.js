import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button } from "components/atoms";

import DropDownMenu from "./drop_down_menu";

const DropDownButton = ({ children, kind, className, options }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const hideMenu = () => setIsMenuVisible(false);

  return (
    <div className={className}>
      <Button
        kind={kind}
        onClick={() => {
          setIsMenuVisible(!isMenuVisible);
        }}
      >
        {children}
      </Button>

      {isMenuVisible && <DropDownMenu hideMenu={hideMenu} options={options} />}
    </div>
  );
};

DropDownButton.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
  kind: PropTypes.any, // TO CHANGE
};

export default DropDownButton;
