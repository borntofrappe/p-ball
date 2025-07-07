import { palette } from "@/lib/styles";
import React, { useRef } from "react";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";

const imageIcon = require("@/assets/images/search-icon.png");

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBox = ({ value, onChangeText }: Props) => {
  const textInput = useRef<TextInput>(null);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        value={value}
        spellCheck={false}
        ref={textInput}
        style={styles.searchInput}
        onChangeText={onChangeText}
      />
      <Pressable
        style={styles.searchButton}
        onPress={() => {
          textInput.current?.focus();
        }}
      >
        <Image source={imageIcon} style={styles.searchIcon} />
      </Pressable>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderColor: palette.green,
    borderWidth: 6,
    borderRadius: 16,
    backgroundColor: palette.backgroundColor,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 8,
    color: palette.input.color,
    fontFamily: "ComicNeue-Bold",
    fontSize: 24,
    borderColor: palette.green,
    borderWidth: 2,
    borderRadius: 6,
    backgroundColor: palette.input.backgroundColor,
  },
  searchButton: {
    padding: 12,
    backgroundColor: palette.primary,
    borderRadius: 6,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
});
