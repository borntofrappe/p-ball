import { Colors } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  theme?: Version;
};

const Panel = ({ label, theme, children }: PropsWithChildren<Props>) => {
  const panelTheme = theme || "Yellow";
  return (
    <View style={[styles.container]}>
      <Text style={[styles.label]}>{label}</Text>
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
    backgroundColor: Colors.yellowBox.background,
    borderWidth: 3,
    borderColor: Colors.yellowBox.primary,
    marginTop: 12,
  },
  label: {
    fontFamily: "ComicNeue-Bold",
    position: "absolute",
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    left: 20,
    top: 0,
    transform: [
      {
        translateY: "-50%",
      },
    ],
    color: Colors.yellowBox.label,
    backgroundColor: Colors.yellowBox.primary,
  },
});
