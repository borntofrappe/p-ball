import {
  borderRadius,
  borderWidth,
  fontFamily,
  fontSize,
  palette,
  size,
} from "@/lib/styles";
import { useRef } from "react";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";

const imageFocus = require("@/assets/images/search-icon-focus.png");
const imageClear = require("@/assets/images/search-icon-clear.png");

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onClearText: () => void;
};

const SearchBox = ({ value, onChangeText, onClearText }: Props) => {
  const textInput = useRef<TextInput>(null);

  return (
    <View style={[styles.container]}>
      <TextInput
        value={value}
        spellCheck={false}
        ref={textInput}
        style={[styles.input]}
        onChangeText={onChangeText}
      />
      {value === "" ? (
        <Pressable
          style={[styles.button]}
          onPress={() => {
            textInput.current?.focus();
          }}
        >
          <Image source={imageFocus} style={[styles.buttonIcon]} />
        </Pressable>
      ) : (
        <Pressable
          style={[styles.button]}
          onPress={() => {
            onClearText();
          }}
        >
          <Image source={imageClear} style={[styles.buttonIcon]} />
        </Pressable>
      )}
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: size[3],
    paddingVertical: size[4],
    borderColor: palette.green,
    borderWidth: borderWidth[3],
    borderRadius: borderRadius[3],
    backgroundColor: palette.form.backgroundColor,
    flexDirection: "row",
    gap: size[2],
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: size[1],
    paddingVertical: size[1],
    color: palette.input.color,
    fontFamily: fontFamily.comicBold,
    fontSize: fontSize.large,
    borderColor: palette.green,
    borderWidth: borderWidth[2],
    borderRadius: borderRadius[1],
    backgroundColor: palette.input.backgroundColor,
  },
  button: {
    padding: 12,
    backgroundColor: palette.primary,
    borderRadius: 6,
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
});
