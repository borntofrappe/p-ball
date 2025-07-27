import { useSpin } from "@/lib/hooks";
import { palette } from "@/lib/styles";
import { Link } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

const imageIcon = require("@/assets/images/nav-icon.png");
const imageSearch = require("@/assets/images/nav-search.png");
const imageCatch = require("@/assets/images/nav-catch.png");
const OPTION_IMAGE_WIDTH = 1070 / 2
const OPTION_IMAGE_HEIGHT = 185 / 2
const CENTER_IMAGE_SIZE = 78

const index = () => {
  const animatedStyle = useSpin({ duration: 1000, repeatCount: 2, delay: 1200 });

  return (
    <View style={[styles.parentContainer]}>
      <View style={[styles.optionContainer]}>
        <Link href="/search" aria-label="Search">
          <Image source={imageSearch} style={[styles.optionImage]} />
        </Link>
      </View>
      <View>
        <View style={[styles.centerBackground]}></View>
        <Animated.Image
          source={imageIcon}
          style={[styles.centerImage, animatedStyle]}
        />
      </View>
      <View style={[styles.optionContainer]}>
        <Link href="/catch" aria-label="Catch">
          <Image source={imageCatch} style={[styles.optionImage]} />
        </Link>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: palette.primary,
  },
  optionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  optionImage: {
    width: OPTION_IMAGE_WIDTH,
    height: OPTION_IMAGE_HEIGHT,
  },
  centerBackground: {
    height: 2,
    backgroundColor: palette.rule,
    position: "absolute",
    left: "0%",
    top: "50%",
    width: "100%",
    transform: [
      {
        translateY: "-50%",
      },
    ],
  },
  centerImage: {
    alignSelf: "center",
    width: CENTER_IMAGE_SIZE,
    height: CENTER_IMAGE_SIZE,
  },
});
