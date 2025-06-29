import { palette } from "@/lib/styles";
import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  theme?: Version | "Yellow";
};

const Panel = ({
  label,
  theme = "Yellow",
  children,
}: PropsWithChildren<Props>) => {
  const colorsPanel = palette.panel[theme];
  const colorsLabel = palette.label[theme];
  return (
    <View
      style={[
        styles.container,
        {
          ...colorsPanel,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            ...colorsLabel,
          },
        ]}
      >
        {label}
      </Text>
      {children}
    </View>
  );
};

export default Panel;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 28,
    paddingVertical: 36,
    paddingHorizontal: 24,
    borderWidth: 3,
    backgroundColor: palette.backgroundColor,
    borderColor: palette.color,
    marginTop: 12,
  },
  label: {
    fontFamily: "ComicNeue-Bold",
    position: "absolute",
    fontSize: 20,
    letterSpacing: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    left: 20,
    top: 0,
    transform: [
      {
        translateY: "-50%",
      },
    ],
    color: palette.backgroundColor,
    backgroundColor: palette.color,
  },
});
