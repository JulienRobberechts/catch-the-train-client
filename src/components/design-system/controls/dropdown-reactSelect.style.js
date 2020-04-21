const selectStyles = (topOfMenu) => ({
  container: (styles) => ({
    ...styles,
    // backgroundColor: "red",
    // color: "red",
    // borderColor: "red",
  }),
  control: (styles) => {
    return {
      ...styles,
      borderColor: "#FFFFFF",
      borderRadius: "5px",
      borderWidth: "1px",
      backgroundColor: "#252149",
      color: "#E0AB19",
      fontSize: "1.2rem",
      boxShadow: "none",

      ":active": {
        ...styles[":active"],
        boxShadow: "none",
        borderColor: "#FFFFFF",
      },
      ":hover": {
        ...styles[":active"],
        boxShadow: "none",
        borderColor: "#E0AB19",
      },
    };
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? "#AAA" : "#252149",
      color: isDisabled
        ? "#5b5a59"
        : isSelected
        ? "#E0AB19"
        : isFocused
        ? "#FFFFFF"
        : "#b1afac",
      cursor: isDisabled ? "not-allowed" : "default",
      fontSize: "1.2rem",
      fontWeight: isFocused ? "800" : "300",
    };
  },
  input: (styles) => {
    return {
      ...styles,
      color: "#E0AB19",
    };
  },
  placeholder: (styles) => {
    return {
      ...styles,
      color: "#b1afac",
    };
  },
  singleValue: (styles) => {
    return {
      ...styles,
      color: "#E0AB19",
    };
  },
  valueContainer: (styles) => {
    return {
      ...styles,
      color: "#E0AB19",
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      boxShadow: "none",
    };
  },
  menuList: (styles) => {
    return {
      ...styles,
      maxHeight: `calc(100vh - ${topOfMenu}px)`,
      border: "1px solid #b1afac",
      paddingTop: "0",
      paddingBottom: "0",
      borderRadius: "5px",
      scrollbarWidth: "none",
      "::-webkitScrollbar": {
        display: "none",
      },
    };
  },
});

export { selectStyles };
