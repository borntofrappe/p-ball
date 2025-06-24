import { useEffect } from "react";
import Animated, {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

const imageActivity = require("@/assets/images/loading-spinner.png");

type Props = {
  width: number;
  height: number;
};

const LoadingSpinner = ({ width, height }: Props) => {
  const duration = 1500;
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
        duration,
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

export default LoadingSpinner;
