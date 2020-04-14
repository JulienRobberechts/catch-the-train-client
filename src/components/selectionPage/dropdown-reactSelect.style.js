import chroma from "chroma-js";

const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 18,
    width: 18,
  },
});

const selectStyles = (topOfMenu) => ({
  control: (styles) => ({ ...styles, backgroundColor: "#CCC" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    // console.log(styles);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? "#AAA"
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : "#CCC",
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },

      ...dot(data.color),
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
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

      border: "2px solid #9AF",
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
