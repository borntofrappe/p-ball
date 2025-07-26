import { animationError } from "@/lib/animations";
import { fontFamily, palette } from "@/lib/styles";
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
    fontSize: 22,
    maxWidth: 360,
    textAlign: "center",
    color: palette.white,
    backgroundColor: palette.black,
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
});
