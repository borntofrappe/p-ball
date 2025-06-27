import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
const imageIcon = require("@/assets/images/nav-icon.png");

const index = () => {
  return (
    <View style={[styles.optionsContainer]}>
      <Link href="/search" style={{ display: "contents" }}>
        <View style={[styles.optionContainer]}>
          <Text style={[styles.optionText]}>Search</Text>
        </View>
      </Link>
      <View>
        <View style={[styles.imageBackground]}></View>
        <Image source={imageIcon} style={[styles.image]} />
      </View>
      <Link href="/catch" style={{ display: "contents" }}>
        <View style={[styles.optionContainer]}>
          <Text style={[styles.optionText]}>Catch</Text>
        </View>
      </Link>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  optionsContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  optionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 32,
    color: Colors.color,
    fontFamily: "Poppins-Bold",
    textTransform: "uppercase",
  },
  imageBackground: {
    height: 2,
    backgroundColor: Colors.color,
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
    width: 56,
    height: 56,
    transform: [],
  },
});
