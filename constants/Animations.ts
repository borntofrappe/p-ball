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

export const animationNotFound = {
  image: require("@/assets/images/entry-not-found.png"),
  size: 150,
  steps: 3,
  keyframe: new Keyframe({
    0: {
      transform: [
        {
          translateX: 0,
        },
      ],
    },
    19.99: {
      transform: [
        {
          translateX: 0,
        },
      ],
    },
    20: {
      transform: [
        {
          translateX: -150,
        },
      ],
    },
    39.99: {
      transform: [
        {
          translateX: -150,
        },
      ],
    },
    40: {
      transform: [
        {
          translateX: 0,
        },
      ],
    },
    59.99: {
      transform: [
        {
          translateX: 0,
        },
      ],
    },
    60: {
      transform: [
        {
          translateX: -150,
        },
      ],
    },
    79.99: {
      transform: [
        {
          translateX: -150,
        },
      ],
    },
    80: {
      transform: [
        {
          translateX: 0,
        },
      ],
    },
    99.99: {
      transform: [
        {
          translateX: 0,
        },
      ],
    },
    100: {
      transform: [
        {
          translateX: -300,
        },
      ],
    },
  }),
  duration: 4000,
  delay: 100,
};
