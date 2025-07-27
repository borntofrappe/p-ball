import { fontFamily, fontSize, imageSize, size } from "@/lib/styles";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";

type Props = {
  name: string;
  uri: string;
  textStyle?: StyleProp<TextStyle>;
};

const Item = ({ name, uri, textStyle = {} }: Props) => {
  const { width, height } = imageSize;
  return (
    <View style={[styles.container]}>
      <Image
        style={[
          {
            width,
            height,
          },
        ]}
        source={{ uri: uri }}
      />
      <Text style={[styles.text, textStyle]}>{name}</Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    gap: size[1],
    alignItems: "center",
  },
  text: {
    fontFamily: fontFamily.comicBold,
    fontSize: fontSize.medium,
    maxWidth: 120,
    textAlign: "center",
  },
});
