import { useEffect } from "react";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const imageActivity = require("@/assets/images/activity-indicator.png");

type Props = {
  width: number;
  height: number;
  duration?: number;
};

const ActivityIndicator = ({ width, height, duration }: Props) => {
  const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

  const spin = useSharedValue<number>(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${spin.value * 360}deg`,
        },
      ],
    };
  });

  useEffect(() => {
    spin.value = withRepeat(
      withTiming(1, {
        duration: duration || 1000,
        easing,
      }),
      -1
    );

    return () => {
      cancelAnimation(spin);
    };
  }, []);

  return (
    <Animated.Image
      style={[
        {
          width,
          height,
        },
        animatedStyle,
      ]}
      source={imageActivity}
    ></Animated.Image>
  );
};

export default ActivityIndicator;
