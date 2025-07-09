import { Image, ImageStyle, StyleProp } from "react-native";

type Props = {
  angle: number;
  imageStyles?: StyleProp<ImageStyle>;
};

const image = require("@/assets/images/catch-paddle.png");

const CatchPaddle = ({ angle, imageStyles = {} }: Props) => {
  return (
    <Image
      style={[
        {
          width: 60,
          height: 30,
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
