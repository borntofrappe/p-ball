import { StyleSheet, View } from "react-native";
import ActivityIndicator from "./ActivityIndicator";

type Props = {
  duration?: number;
};

const CONTAINER_SIZE = 180;
const INDICATOR_SIZE = 120;

const LoadingSpinner = ({ duration = 1000 }: Props) => {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator
        width={INDICATOR_SIZE}
        height={INDICATOR_SIZE}
        duration={duration}
      />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
});
