import React from "react";
import { Dropdown } from "semantic-ui-react";

const DropdownMultipleSearchSelection = ({
  options,
  onChange,
  multiple,
  disabled,
}) => {
  return (
    <Dropdown
      placeholder="Select Interviewers"
      fluid
      multiple={multiple}
      disabled={disabled}
      selection
      options={options}
      onChange={onChange}
    />
  );
};

export default DropdownMultipleSearchSelection;
