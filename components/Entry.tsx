import PixelatedImage from "@/components/PixelatedImage";
import { fontFamily, palette } from "@/lib/styles";
import { StyleSheet, Text, View } from "react-native";

const Entry = ({
  no,
  name,
  category,
  height,
  weight,
  description,
  uri,
}: Entry) => {
  const imageScale = 3;
  const imageWidth = 46 * imageScale;
  const imageHeight = 30 * imageScale;

  return (
    <View style={[styles.entryContainer]}>
      <Text style={[styles.text, styles.textSmall, styles.textUppercase]}>
        No. {no}
      </Text>
      <View style={[styles.imageTextContainer]}>
        <View style={[styles.imageContainer]}>
          <PixelatedImage width={imageWidth} height={imageHeight} uri={uri} />
        </View>
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
    backgroundColor: palette.black,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  imageTextContainer: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: palette.white,
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
  },
  text: {
    fontSize: 24,
    fontFamily: fontFamily.pixelEntry,
    color: palette.white,
    letterSpacing: 0.75,
  },
  textUppercase: {
    textTransform: "uppercase",
  },
  textSmall: {
    fontSize: 22,
  },
  textLarge: {
    fontSize: 26,
  },
  textDescription: {
    color: palette.black,
    backgroundColor: palette.white,
    padding: 8,
    lineHeight: 26,
    letterSpacing: 0.2,
  },
});
