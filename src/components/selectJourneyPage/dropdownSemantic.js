import React from "react";
import { useField } from "formik";
import { Dropdown } from "semantic-ui-react";

const DropdownSemantic = ({ ...props }) => {
  const [field, meta, helpers] = useField(props);
  const finalProps = { ...props, ...field };

  // Can be useful to act on the full formik
  // const formikContext = useFormikContext();
  // console.log("DropdownSemantic formikContext ", { formikContext });

  // console.log("DropdownSemantic helpers ", { helpers });
  // console.log("DropdownSemantic", { props });
  // console.log("DropdownSemantic", { field });
  // console.log("DropdownSemantic", { meta });
  // console.log("DropdownSemantic", { finalProps });

  return (
    <Dropdown
      {...finalProps}
      onChange={(e, data) => {
        helpers.setValue(data.value);
        const touched = data.value !== meta.initialValue;
        helpers.setTouched(data.value !== meta.initialValue);
      }}
    />
  );
};

export default DropdownSemantic;
