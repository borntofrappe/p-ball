import { Colors } from "@/constants/Colors";
import React, { useRef } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
const imageIcon = require("@/assets/images/search-icon.png");

type Props = {
  title: string;
  onChangeText: (text: string) => void;
};

const SearchBox = ({ title, onChangeText }: Props) => {
  const textInput = useRef<TextInput>(null);

  return (
    <View style={styles.searchContainer}>
      <Text style={styles.searchTitle}>{title}</Text>
      <View style={styles.searchRow}>
        <TextInput
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
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  searchContainer: {
    gap: 28,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderColor: Colors.green,
    borderWidth: 6,
    borderRadius: 16,
    backgroundColor: Colors.backgroundColor,
  },
  searchTitle: {
    fontFamily: "ComicNeue-Bold",
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    color: Colors.pill.color,
    backgroundColor: Colors.pill.backgroundColor,
    borderRadius: 1e5,
    fontSize: 18,
    textTransform: "uppercase",
  },
  searchRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
    color: Colors.input.color,
    fontFamily: "ComicNeue-Bold",
    fontSize: 20,
    borderColor: Colors.green,
    borderWidth: 2,
    borderRadius: 6,
    backgroundColor: Colors.input.backgroundColor,
  },
  searchButton: {
    padding: 12,
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  searchIcon: {
    width: 17,
    height: 17,
  },
});
