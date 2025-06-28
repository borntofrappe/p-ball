import { Keyframe } from "react-native-reanimated";

export const animationError = {
  image: require("@/assets/images/error.png"),
  size: 200,
  steps: 3,
  keyframe: new Keyframe(
    Object.fromEntries([
      ...Array(7)
        .fill("")
        .map((_, i, { length }) => {
          const percentFrom = (100 / length) * i;
          const percentTo = (100 / length) * (i + 1) * 0.9999;
          const translateX = i % 2 === 0 ? 0 : -200;
          return [
            [percentFrom, { transform: [{ translateX }] }],
            [percentTo, { transform: [{ translateX }] }],
          ];
        })
        .flat(),
      [100, { transform: [{ translateX: -400 }] }],
    ])
  ),
  duration: 500,
  delay: 1000,
};
