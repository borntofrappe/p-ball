import { Keyframe } from "react-native-reanimated";

const animationErrorDuration = 500;
const animationErrorDelay = 3000;
const animationErrorStart =
  100 / ((animationErrorDuration + animationErrorDelay) / animationErrorDelay);

export const animationError = {
  image: require("@/assets/images/error.png"),
  size: 200,
  steps: 3,
  keyframe: new Keyframe(
    Object.fromEntries([
      [0, { transform: [{ translateX: 0 }] }],
      ...Array(10)
        .fill("")
        .map((_, i, { length }) => {
          const from =
            animationErrorStart + ((100 - animationErrorStart) / length) * i;
          const to =
            animationErrorStart +
            ((100 - animationErrorStart) / length) * (i + 1) * 0.9999;
          const translateX = i % 2 === 0 ? 0 : -200;
          return [
            [from, { transform: [{ translateX }] }],
            [to, { transform: [{ translateX }] }],
          ];
        })
        .flat(),
      [100, { transform: [{ translateX: -400 }] }],
    ])
  ),
  duration: animationErrorDuration + animationErrorDelay,
};

export const animationNotFound = {
  image: require("@/assets/images/not-found.png"),
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
};
