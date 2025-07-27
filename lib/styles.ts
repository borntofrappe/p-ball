import { ImageStyle, StyleProp, ViewStyle } from "react-native";

export const palette = {
  color: "#150c03",
  backgroundColor: "#faf8f2",
  primary: "#f9b422",
  rule: "#333333",
  white: "#ffffff",
  black: "#000000",
  red: "#e9270d",
  blue: "#0e0706",
  green: "#82c05d",
  grey: "#a8a8a8",
  form: {
    color: "#150c03",
    backgroundColor: "#fbf7f2",
  },
  input: {
    color: "#150c03",
    backgroundColor: "#ffffff",
  },
  searchItem: {
    color: "#ffffff",
    backgroundColor: "#150c03",
    highlight: "#82c05daa",
  },
  panel: {
    Yellow: {
      color: "#3f1f17",
      backgroundColor: "#f6ecab",
      borderColor: "#f9b422",
    },
    Red: {
      color: "#440000",
      backgroundColor: "#ffe4e2",
      borderColor: "#e52405",
    },
    Blue: {
      color: "#020f22",
      backgroundColor: "#d3e0f2",
      borderColor: "#2d1e67",
    },
  },
  label: {
    Yellow: {
      color: "#3f1f17",
      backgroundColor: "#f9b422",
    },
    Red: {
      color: "#fff5ea",
      backgroundColor: "#e9270d",
    },
    Blue: {
      color: "#f1eefe",
      backgroundColor: "#2d1e67",
    },
  },
  option: {
    inactive: {
      color: "#ffffff",
    },
    primary: {
      color: "#1d82a5",
      backgroundColor: "#cee1e8",
    },
    secondary: {
      color: "#a2384a",
      backgroundColor: "#edd2c1",
    },
  },
};

export const fontFamily = {
  comicBold: "ComicNeue-Bold",
  pixelEntry: "PixelEntry",
  poppinsBold: "PoppinsBold",
};

export const fontSize = {
  normal: 20,
  medium: 22,
  large: 28,
};

export const borderRadius = {
  1: 6,
  2: 8,
  3: 12,
};

export const borderWidth = {
  1: 2,
  2: 3,
  3: 5,
};

export const size = {
  1: 8,
  2: 12,
  3: 16,
  4: 28,
  5: 32,
};

export const imageSize = {
  width: 46,
  height: 30,
};

export const pageContainer: StyleProp<ViewStyle> = {
  maxWidth: 480,
  flex: 1,
  width: "100%",
  marginInline: "auto",
  paddingHorizontal: size[3],
  paddingVertical: size[3],
};

export const centerContainer: StyleProp<ViewStyle> = {
  alignSelf: "center",
};

export const grayScaleContainer: StyleProp<ViewStyle> = {
  filter: "grayscale(1) brightness(0.1)",
};
