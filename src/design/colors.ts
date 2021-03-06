export * from "./color-utils";

interface BRYRPalette {
  blue: string;
  darkGray: string;
  gray: string;
  white: string;
  green: string;
  yellow: string;
  red: string;
}

const palette: BRYRPalette = {
  blue: "#252149",
  darkGray: "#5b5a59",
  gray: "#b1afac",
  white: "#FFFFFF",
  green: "#60A38E",
  yellow: "#E0AB19",
  red: "#E6716E",
};

const getBRYRColors = (p: BRYRPalette) => ({
  dark: {
    background: p.blue,
    text: {
      disabled: p.gray,
      normal: p.white,
      original: p.green,
      highlight: p.yellow,
      warning: p.red,
    },
    panel: {
      one: {
        background: p.white,
        text: {
          disabled: p.gray,
          normal: p.blue,
          original: p.green,
          highlight: p.red,
          warning: p.red,
        },
        button: {
          one: {
            background: p.green,
            text: {
              normal: p.blue,
              highlight: p.white,
            },
          },
          highlight: {
            background: p.yellow,
            text: {
              normal: p.blue,
              highlight: p.white,
            },
          },
        },
      },
      special: {
        background: p.green,
        text: {
          disabled: p.gray,
          normal: p.blue,
          original: p.red,
          highlight: p.white,
          warning: p.yellow,
        },
        button: {
          one: {
            background: p.green,
            text: {
              normal: p.blue,
              highlight: p.white,
            },
          },
          highlight: {
            background: p.yellow,
            text: {
              normal: p.blue,
              highlight: p.white,
            },
          },
        },
      },
    },
  },
  light: {
    background: p.white,
    text: {
      disabled: p.gray,
      normal: p.blue,
      original: p.green,
      highlight: p.red,
      warning: p.red,
    },
    panel: {
      one: {
        background: p.white,
        text: {
          disabled: p.gray,
          normal: p.blue,
          original: p.green,
          highlight: p.red,
          warning: p.red,
        },
        button: {
          one: {
            background: p.green,
            text: {
              normal: p.blue,
              highlight: p.white,
            },
          },
          highlight: {
            background: p.yellow,
            text: {
              normal: p.blue,
              highlight: p.white,
            },
          },
        },
      },
      special: {
        background: p.green,
        text: {
          disabled: p.gray,
          normal: p.blue,
          original: p.red,
          highlight: p.white,
          warning: p.yellow,
        },
        button: {
          one: {
            background: p.green,
            text: {
              normal: p.blue,
              highlight: p.white,
            },
          },
          highlight: {
            background: p.yellow,
            text: {
              normal: p.blue,
              highlight: p.white,
            },
          },
        },
      },
    },
  },
});

const colors = getBRYRColors(palette);

export { colors, palette };
