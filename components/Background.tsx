import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Defs, Pattern, Rect, Image as SvgImage } from "react-native-svg";

const imagePattern = require("@/assets/images/app-pattern-background.png");
const PATTERN_SIZE = 120;

// relative parent
const Background = () => {
  return (
    <Svg width="100%" height="100%" style={[StyleSheet.absoluteFill]}>
      <Defs>
        <Pattern
          id="pattern-background"
          width={PATTERN_SIZE}
          height={PATTERN_SIZE}
          patternUnits="userSpaceOnUse"
        >
          <SvgImage
            href={imagePattern}
            width={PATTERN_SIZE}
            height={PATTERN_SIZE}
          />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#pattern-background)" />
    </Svg>
  );
};

export default Background;
