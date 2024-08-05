import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  StyledAccordionHeading,
  StyledAccordionContent,
} from "./styled_accordion";

const Accordion = ({
  title,
  children,
  defaultExpanded = false,
  borders = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);

  return (
    <>
      <StyledAccordionHeading
        kind="extra"
        type="button"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        expanded={isExpanded}
      >
        {title}
      </StyledAccordionHeading>
      <StyledAccordionContent borders={borders} expanded={isExpanded}>
        {children}
      </StyledAccordionContent>
    </>
  );
};

Accordion.propTypes = {
  title: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  defaultExpanded: PropTypes.bool,
  borders: PropTypes.bool,
};

export default Accordion;
