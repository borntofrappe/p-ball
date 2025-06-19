import { Colors } from "@/constants/Colors";
import React, { useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
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
          ref={textInput}
          style={styles.searchInput}
          onChangeText={onChangeText}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            textInput.current?.focus();
          }}
        >
          <Image source={searchIcon} style={styles.searchIcon} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
    gap: 18,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderColor: Colors.green,
    borderWidth: 6,
    borderRadius: 12,
    backgroundColor: Colors.background,
  },
  searchTitle: {
    alignSelf: "center",
    paddingHorizontal: 16,
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
    color: Colors.input.color,
    paddingVertical: 8,
    paddingHorizontal: 14,
    fontSize: 18,
    flex: 1,
  },
  searchIcon: {
    width: 18,
    marginHorizontal: 12,
    height: 18,
  },
});
