import { defaultImage, fontFamily } from "@/lib/styles";
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
  return (
    <View style={[styles.container]}>
      <Image style={[defaultImage]} source={{ uri: uri }} />
      <Text style={[styles.text, textStyle]}>{name}</Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    gap: 4,
    alignItems: "center",
  },
  text: {
    fontFamily: fontFamily.comicBold,
    fontSize: 20,
    maxWidth: 100,
    textAlign: "center",
  },
});
