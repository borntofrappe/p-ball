import { palette } from "@/lib/styles";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";
const imagePattern = require("@/assets/images/ribbon-pattern.png");

const Ribbon = () => {
  const windowWidth = Dimensions.get("window").width;
  const [width, setWidth] = useState(windowWidth);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWidth(window.width);
    });
    return () => subscription?.remove();
  });

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: palette.primary,
      }}
    >
      <Image
        source={imagePattern}
        style={{
          width: Math.floor(width / 50) * 50,
          height: 50,
        }}
        resizeMode="repeat"
      />
    </View>
  );
};

export default Ribbon;
