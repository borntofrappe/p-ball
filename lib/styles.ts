import { ImageStyle, StyleProp, ViewStyle } from "react-native";

export const palette = {
  color: "#150c03",
  backgroundColor: "#fbf7f2",
  primary: "#f9b422",
  highlight: "#f9b422",
  white: "#ffffff",
  black: "#000000",
  red: "#e9270d",
  blue: "#0e0706",
  green: "#82c05d",
  grey: "#a8a8a8",
  icon: {
    color: "#333333",
  },
  pill: {
    color: "#fbf7f2",
    backgroundColor: "#150a06",
  },
  input: {
    color: "#150a06",
    backgroundColor: "#ffffff",
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

export const pageContainer: StyleProp<ViewStyle> = {
  maxWidth: 500,
  width: "100%",
  marginInline: "auto",
  paddingHorizontal: 16,
  paddingVertical: 16,
};

export const defaultImage: StyleProp<ImageStyle> = {
  width: 46,
  height: 30,
};

export const panelsContainer: StyleProp<ViewStyle> = {
  gap: 16,
};

export const singleContainer: StyleProp<ViewStyle> = {
  marginTop: 16,
  alignSelf: "center",
};
