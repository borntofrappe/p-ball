import { useSpin } from "@/lib/hooks";
import Animated from "react-native-reanimated";

const imageActivity = require("@/assets/images/activity-indicator.png");

type Props = {
  width: number;
  height: number;
  duration?: number;
};

const ActivityIndicator = ({ width, height, duration }: Props) => {
  const animatedStyle = useSpin({ duration, repeatCount: -1 });

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
