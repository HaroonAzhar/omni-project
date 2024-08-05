import React from "react";

import ColorPicker from "../../atoms/color_picker/color_picker";
import { StyledAdminField } from "../styled_admin";

export default function InputWithColorPicker() {
  return (
    <>
      <StyledAdminField
        component={ColorPicker}
        name="ColorCode"
        label="Color for tag"
      />
    </>
  );
}
