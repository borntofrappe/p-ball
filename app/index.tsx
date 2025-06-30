import { palette } from "@/lib/styles";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

const imageIcon = require("@/assets/images/nav-icon.png");
const imageSearch = require("@/assets/images/nav-search.png");
const imageCatch = require("@/assets/images/nav-catch.png");

const index = () => {
  return (
    <View style={[styles.parentContainer]}>
      <View style={[styles.optionContainer]}>
        <Link href="/search" aria-label="Search">
          <Image source={imageSearch} style={[styles.optionImage]} />
        </Link>
      </View>
      <View>
        <View style={[styles.imageBackground]}></View>
        <Image source={imageIcon} style={[styles.image]} />
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
    width: 300,
    height: 61,
  },
  imageBackground: {
    height: 2,
    backgroundColor: palette.icon.color,
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
  image: {
    alignSelf: "center",
    width: 64,
    height: 64,
    transform: [],
  },
});
