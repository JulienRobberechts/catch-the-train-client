const optionIcon = () => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: "#E6716E",
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 18,
    width: 18,
  },
});

const selectStyles = (topOfMenu) => ({
  container: (styles) => ({
    ...styles,
    // backgroundColor: "red",
    // color: "red",
    // borderColor: "red",
  }),
  control: (styles) => {
    console.log("control", { styles });
    return {
      ...styles,

      // backgroundColor: "red",
      // color: "red",
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
    // console.log(styles);
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
    };
  },
  input: (styles) => {
    console.log("input", { styles });
    return {
      ...styles,

      // backgroundColor: "red",
      // color: "red",
      // borderColor: "#FFFFFF",
      // borderRadius: "15px",
      // borderWidth: "4px",
      // backgroundColor: "#E0AB19",
      color: "#E0AB19",
    };
  },
  placeholder: (styles) => {
    console.log("placeholder", { styles });
    return {
      ...styles,

      // backgroundColor: "red",
      // color: "red",
      // borderColor: "#FFFFFF",
      // borderRadius: "15px",
      // borderWidth: "4px",
      // backgroundColor: "#E0AB19",
      color: "#b1afac",
    };
  },
  singleValue: (styles) => {
    console.log("singleValue", { styles });
    return {
      ...styles,

      // backgroundColor: "red",
      // color: "red",
      // borderColor: "#FFFFFF",
      // borderRadius: "15px",
      // borderWidth: "4px",
      // backgroundColor: "#E0AB19",
      color: "#E0AB19",
    };
  },
  valueContainer: (styles) => {
    console.log("valueContainer", { styles });
    return {
      ...styles,

      // backgroundColor: "red",
      // color: "red",
      // borderColor: "#FFFFFF",
      // borderRadius: "15px",
      // borderWidth: "4px",
      // backgroundColor: "#E0AB19",
      color: "#E0AB19",
    };
  },
  menu: (styles) => {
    // console.log("menu", { styles });
    return {
      ...styles,
      boxShadow: "none",
    };
  },
  menuList: (styles) => {
    // console.log("menuList", { topOfMenu, styles });
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
