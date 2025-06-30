import { animationError } from "@/lib/animations";
import React from "react";
import { Text, View } from "react-native";
import StepAnimation from "./StepAnimation";

type Props = {
  error: Error;
};

const ErrorMessage = ({ error }: Props) => {
  return (
    <View>
      <View
        style={{
          width: animationError.size,
          height: animationError.size,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StepAnimation {...animationError} />
      </View>

      <Text
        style={{
          fontFamily: "ComicNeue-Bold",
          fontSize: 20,
          maxWidth: 360,
          textAlign: "center",
        }}
      >
        {error.message}
      </Text>
    </View>
  );
};

export default ErrorMessage;
