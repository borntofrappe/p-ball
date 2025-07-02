import { defaultImage } from "@/lib/styles";
import React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";

type Props = {
  name: string;
  uri: string;
  textStyle?: StyleProp<TextStyle>;
};

const Item = ({ name, uri, textStyle = {} }: Props) => {
  return (
    <View style={[styles.itemContainer]}>
      <Image style={[defaultImage]} source={{ uri: uri }} />
      <Text style={[styles.itemText, textStyle]}>{name}</Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  itemContainer: {
    gap: 4,
    alignItems: "center",
  },
  itemText: {
    fontFamily: "ComicNeue-Bold",
    fontSize: 20,
    maxWidth: 100,
    textAlign: "center",
  },
});
