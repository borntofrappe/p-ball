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
const searchIcon = require("@/assets/images/search-icon.png");

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
          onPress={() => {
            textInput.current?.focus();
          }}
        >
          <Image source={searchIcon} style={styles.searchIcon} />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  searchContainer: {
    gap: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderColor: Colors.green,
    borderWidth: 6,
    borderRadius: 12,
    backgroundColor: Colors.background,
  },
  searchTitle: {
    fontFamily: "ComicNeue-Bold",
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    color: Colors.white,
    backgroundColor: Colors.text,
    borderRadius: 1e5,
    fontSize: 18,
    textTransform: "uppercase",
  },
  searchRow: {
    flexDirection: "row",
    borderColor: Colors.green,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: Colors.input.background,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
    color: Colors.input.color,
    fontFamily: "ComicNeue-Bold",
    fontSize: 20,
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginHorizontal: 12,
  },
});
