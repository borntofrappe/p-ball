import { animationError } from "@/lib/animations";
import { fontFamily, fontSize, palette, size } from "@/lib/styles";
import { StyleSheet, Text, View } from "react-native";
import StepAnimation from "./StepAnimation";

type Props = {
  error: Error;
};

const ErrorMessage = ({ error }: Props) => {
  return (
    <View>
      <View
        style={[
          styles.container,
          {
            width: animationError.size,
            height: animationError.size,
            alignSelf: "center",
          },
        ]}
      >
        <StepAnimation {...animationError} />
      </View>

      <Text style={[styles.text]}>{error.message}</Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: fontFamily.pixelEntry,
    fontSize: fontSize.medium,
    maxWidth: 360,
    textAlign: "center",
    color: palette.white,
    backgroundColor: palette.black,
    paddingHorizontal: size[2],
    paddingVertical: size[1],
  },
});
