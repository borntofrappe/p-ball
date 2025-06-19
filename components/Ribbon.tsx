import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";

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
        backgroundColor: Colors.primary,
      }}
    >
      <Image
        source={require("@/assets/images/pattern.png")}
        style={{
          width: Math.floor(width / 60) * 60,
          height: 60,
        }}
        resizeMode="repeat"
      />
    </View>
  );
};

export default Ribbon;
