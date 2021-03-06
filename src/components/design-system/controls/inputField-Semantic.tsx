import React from "react";
import { useField } from "formik";
import { Form } from "semantic-ui-react";

interface Props {
  name: string;
  [props: string]: any;
}

const InputField: React.FC<Props> = ({ name, ...props }) => {
  if (!name) console.warn("no name on InputField");
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);

  const errorText = meta.error && meta.touched ? meta.error : null;
  const error = errorText ? { content: errorText, pointing: "above" } : null;

  return (
    <Form.Input
      name
      error={error}
      {...props}
      value={field.value}
      onChange={(_e, data) => {
        helpers.setValue(data.value);
      }}
      onBlur={() => {
        helpers.setTouched(true);
      }}
    />
  );
};

export default InputField;
