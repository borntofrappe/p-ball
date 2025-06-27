import { ImageBackground, ImageSourcePropType, View } from "react-native";
import Animated from "react-native-reanimated";
import { ReanimatedKeyframe } from "react-native-reanimated/lib/typescript/layoutReanimation/animationBuilder/Keyframe";

type Props = {
  image: ImageSourcePropType;
  size: number;
  steps: number;
  keyframe: ReanimatedKeyframe;
  duration: number;
  delay: number;
};

const StepAnimation = ({
  image,
  size,
  steps,
  keyframe,
  duration,
  delay,
}: Props) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        overflow: "hidden",
      }}
    >
      <Animated.View entering={keyframe.duration(duration).delay(delay)}>
        <ImageBackground
          style={{
            width: size * steps,
            height: size,
          }}
          source={image}
        ></ImageBackground>
      </Animated.View>
    </View>
  );
};

export default StepAnimation;
