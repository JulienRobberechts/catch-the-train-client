import React from "react";
import { useField } from "formik";
import Select from "react-select";

const DropdownReactSelectField = ({ name, ...props }) => {
  if (!name) console.warn("mission name on DropdownReactSelectField");
  // eslint-disable-next-line no-unused-vars
  const [field, _meta, helpers] = useField(name);
  return (
    <Select
      name
      {...props}
      value={field.value}
      onChange={(value) => {
        helpers.setValue(value);
      }}
      onBlur={() => {
        helpers.setTouched();
      }}
    />
  );
};

export { DropdownReactSelectField as default };
