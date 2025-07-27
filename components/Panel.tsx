import { borderWidth, fontFamily, fontSize, palette, size } from "@/lib/styles";
import { PropsWithChildren } from "react";
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
    gap: size[4],
    paddingVertical: size[5],
    paddingHorizontal: size[3],
    borderWidth: borderWidth[2],
    marginTop: size[3],
  },
  label: {
    fontFamily: fontFamily.comicBold,
    position: "absolute",
    fontSize: fontSize.medium,
    letterSpacing: 0.5,
    paddingHorizontal: size[2],
    paddingVertical: 2,
    left: "5%",
    top: 0,
    transform: [
      {
        translateY: "-50%",
      },
    ],
  },
});
