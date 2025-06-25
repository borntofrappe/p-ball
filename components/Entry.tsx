import PixelatedImage from "@/components/PixelatedImage";
import React from "react";
import { Text, View } from "react-native";

const Entry = ({ no, name, category, height, weight, description, uri }: Entry) => {
  const imageScale = 3;
  const imageWidth = 46 * imageScale;
  const imageHeight = 30 * imageScale;

  return (
    <View>
      <Text>No. {no}</Text>
      <PixelatedImage width={imageWidth} height={imageHeight} uri={uri} />
      <Text>{name}</Text>
      <Text>{category}</Text>
      <Text>H {height}</Text>
      <Text>W {weight}</Text>
      <Text>{description}</Text>
    </View>
  );
};

export default Entry;
