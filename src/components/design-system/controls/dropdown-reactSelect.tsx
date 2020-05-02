import React from "react";
import { useField } from "formik";
import Select from "react-select";

interface Props {
  name: string;
  [props: string]: any;
}

const DropdownReactSelectField: React.FC<Props> = ({ name, ...props }) => {
  if (!name) console.warn("mission name on DropdownReactSelectField");
  // eslint-disable-next-line no-unused-vars
  const [field, , helpers] = useField(name);
  return (
    <Select
      name={name}
      {...props}
      value={field.value}
      onChange={(value) => {
        helpers.setValue(value);
      }}
      onBlur={() => {
        helpers.setTouched(true);
      }}
    />
  );
};

export { DropdownReactSelectField as default };
