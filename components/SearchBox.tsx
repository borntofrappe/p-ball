import { fontFamily, palette } from "@/lib/styles";
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
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderColor: palette.green,
    borderWidth: 6,
    borderRadius: 16,
    backgroundColor: palette.form.backgroundColor,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 8,
    color: palette.input.color,
    fontFamily: fontFamily.comicBold,
    fontSize: 24,
    borderColor: palette.green,
    borderWidth: 2,
    borderRadius: 6,
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
