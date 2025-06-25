import React from "react";
import { Platform, View } from "react-native";
import Svg, { Image as SvgImage } from "react-native-svg";

import { WebView } from "react-native-webview";


type Props = {
  uri: string;
  width: number;
  height: number;
};

const PixelatedImage = ({ width, height, uri }: Props) => {
  return Platform.OS === "web" ? (
    <Svg width={width} height={height} image-rendering="pixelated">
      <SvgImage width={width} height={height} href={{ uri }} />
    </Svg>
  ) : (
    <View
      style={{
        width: width,
        height: height,
      }}
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
