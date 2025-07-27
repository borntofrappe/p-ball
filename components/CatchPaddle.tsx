import { Image, ImageStyle, StyleProp } from "react-native";

type Props = {
  angle: number;
  imageStyles?: StyleProp<ImageStyle>;
};

const image = require("@/assets/images/catch-paddle.png");
const IMAGE_WIDTH = 60;
const IMAGE_HEIGHT = 30;

const CatchPaddle = ({ angle, imageStyles = {} }: Props) => {
  return (
    <Image
      style={[
        {
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
        },
        imageStyles,
        {
          transform: [
            {
              rotateZ: `${angle}deg`,
            },
          ],
        },
      ]}
      source={image}
    />
  );
};

export default CatchPaddle;
