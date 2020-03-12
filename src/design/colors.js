export * from "./color-utils";

const palette = {
  blue: "#252149",
  gray: "#b1afac",
  white: "#FFFFFF",
  green: "#60A38E",
  yellow: "#E0AB19",
  red: "#E6716E"
};

const getColors = p => ({
  dark: {
    background: p.blue,
    text: {
      disabled: p.gray,
      normal: p.white,
      original: p.green,
      highlight: p.yellow,
      warning: p.red
    },
    panel: {
      one: {
        background: p.white,
        text: {
          disabled: p.gray,
          normal: p.blue,
          original: p.green,
          highlight: p.red,
          warning: p.red
        },
        button: {
          one: {
            background: p.green,
            text: {
              normal: p.blue,
              highlight: p.white
            }
          },
          highlight: {
            background: p.yellow,
            text: {
              normal: p.blue,
              highlight: p.white
            }
          }
        }
      },
      special: {
        background: p.green,
        text: {
          disabled: p.gray,
          normal: p.blue,
          original: p.red,
          highlight: p.white,
          warning: p.yellow
        },
        button: {
          one: {
            background: p.green,
            text: {
              normal: p.blue,
              highlight: p.white
            }
          },
          highlight: {
            background: p.yellow,
            text: {
              normal: p.blue,
              highlight: p.white
            }
          }
        }
      }
    }
  }
});

const colors = getColors(palette);

export { colors, palette };
