import PixelatedImage from "@/components/PixelatedImage";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

type Props = Entry & {
  imageStyles?: StyleProp<ViewStyle>;
};
const Entry = ({
  no,
  name,
  category,
  height,
  weight,
  description,
  uri,
  imageStyles = {},
}: Props) => {
  const imageScale = 3;
  const imageWidth = 46 * imageScale;
  const imageHeight = 30 * imageScale;

  return (
    <View style={[styles.entryContainer]}>
      <Text style={[styles.text, styles.textSmall, styles.textUppercase]}>
        No. {no}
      </Text>
      <View style={[styles.imageTextContainer]}>
        <PixelatedImage
          style={[
            {
              backgroundColor: Colors.white,
            },
            imageStyles,
          ]}
          width={imageWidth}
          height={imageHeight}
          uri={uri}
        />
        <View style={[styles.textContainer]}>
          <Text style={[styles.text, styles.textLarge, styles.textUppercase]}>
            {name}
          </Text>
          <Text style={[styles.text, styles.textLarge, styles.textUppercase]}>
            {category}
          </Text>
          <View style={[styles.metricsContainer]}>
            <Text style={[styles.text, styles.textSmall]}>H {height}m</Text>
            <Text style={[styles.text, styles.textSmall]}>W {weight}kg</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.text, styles.textDescription]}>{description}</Text>
    </View>
  );
};

export default Entry;

const styles = StyleSheet.create({
  entryContainer: {
    maxWidth: 400,
    marginInline: "auto",
    backgroundColor: Colors.black,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  imageTextContainer: {
    flexDirection: "row",
    gap: 12,
  },
  textContainer: {
    gap: 8,
    justifyContent: "space-evenly",
    flex: 1,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    paddingInlineEnd: 8,
  },
  text: {
    fontSize: 22,
    fontFamily: "PixelEntry",
    color: Colors.white,
    letterSpacing: 0.75,
  },
  textUppercase: {
    textTransform: "uppercase",
  },
  textSmall: {
    fontSize: 20,
  },
  textLarge: {
    fontSize: 24,
  },
  textDescription: {
    color: Colors.black,
    backgroundColor: Colors.white,
    padding: 8,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
});
