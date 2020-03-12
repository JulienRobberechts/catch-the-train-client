export * from "./color-utils";

const palette3 = {
  color1: "#252149", // background
  color2: "#E0AB19", // background
  color3: "#FFFFFF", // background
  color4: "#60A38E", // background
  color5: "#60A38E", // title
  color6: "#FFFFFF" // string
};

const palette4 = {
  color1: "#252149", // background
  color2: "#F3F0EC", // background
  color3: "#FFFFFF", // panels
  color4: "#60A38E", // text2
  color5: "#E0AB19", // background
  color6: "#E0AB19", // background

  blue: "#252149",
  gray: "#F3F0EC",
  white: "#FFFFFF",
  green: "#60A38E",
  yellow: "#E0AB19",
  red: "#E6716E",

  dark: {
    background: "#252149",
    text: {
      disabled: "#F3F0EC", // todo
      normal: "#F3F0EC",
      original: "#60A38E",
      highlight: "#E0AB19",
      warning: "#E6716E"
    },
    panel: {
      one: {
        background: "#FFFFFF",
        text: {
          disabled: "#F3F0EC", // todo
          normal: "#252149",
          original: "#60A38E",
          highlight: "#E6716E",
          warning: "#E6716E"
        },
        button: {
          one: {
            background: "#60A38E",
            text: {
              normal: "#252149",
              highlight: "#FFFFFF"
            }
          },
          highlight: {
            background: "#E0AB19",
            text: {
              normal: "#252149",
              highlight: "#FFFFFF"
            }
          }
        }
      },
      special: {
        background: "#60A38E",
        text: {
          disabled: "#F3F0EC", // todo
          normal: "#252149",
          original: "#60A38E",
          highlight: "#E6716E",
          warning: "#E6716E"
        },
        button: {
          one: {
            background: "#60A38E",
            text: {
              normal: "#252149",
              highlight: "#FFFFFF"
            }
          },
          highlight: {
            background: "#E0AB19",
            text: {
              normal: "#252149",
              highlight: "#FFFFFF"
            }
          }
        }
      }
    }
  }
};

const colors = palette4;

export { colors };
