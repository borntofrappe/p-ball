import React from "react";
import { Platform, StyleProp, View, ViewStyle } from "react-native";
import Svg, { Image as SvgImage } from "react-native-svg";

import { WebView } from "react-native-webview";

type Props = {
  uri: string;
  width: number;
  height: number;
  style?: StyleProp<ViewStyle>;
};

const PixelatedImage = ({ width, height, uri, style = {} }: Props) => {
  return Platform.OS === "web" ? (
    <Svg
      style={[style]}
      width={width}
      height={height}
      image-rendering="pixelated"
    >
      <SvgImage width={width} height={height} href={{ uri }} />
    </Svg>
  ) : (
    <View
      style={[
        {
          width: width,
          height: height,
        },
        style,
      ]}
    >
      <WebView
        domStorageEnabled={false}
        javaScriptEnabled={false}
        scalesPageToFit={false}
        style={{
          backgroundColor: "transparent",
        }}
        originWhitelist={["*"]}
        source={{
          html: `<body style="margin: 0;">
          <img 
            alt=""
            src="${uri}" 
            style="
            display: block;
            width: ${width}px;
            height: ${height}px;
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
            "
          />
        </body>`,
        }}
      />
    </View>
  );
};

export default PixelatedImage;
