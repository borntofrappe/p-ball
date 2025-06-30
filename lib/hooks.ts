import { useEffect } from "react";
import {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

type Props = {
  duration?: number;
  repeatCount?: number;
};

export function useSpin({ duration = 1000, repeatCount = 1 }: Props) {
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
      repeatCount
    );

    return () => {
      cancelAnimation(spin);
    };
  }, []);
  return animatedStyle;
}
