import React from "react";
import { View } from "react-native";
import ActivityIndicator from "./ActivityIndicator";

type Props = {
  duration?: number;
};

const LoadingSpinner = ({ duration = 1000 }: Props) => {
  return (
    <View
      style={{
        width: 180,
        height: 180,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator width={120} height={120} duration={duration} />
    </View>
  );
};

export default LoadingSpinner;
