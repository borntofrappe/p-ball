import { palette } from "@/lib/styles";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  items: Match[];
  onSelect: (text: string) => void;
  highlight?: string;
};

const SearchList = ({ items, onSelect, highlight = "" }: Props) => {
  const regex = new RegExp(highlight, "i");
  const { length } = highlight;
  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={items}
      renderItem={({ item, index }) => {
        const text = item.name;
        const from = text.search(regex);
        const to = from + length;
        const start = text.slice(0, from);
        const match = text.slice(from, to);
        const end = text.slice(from + to);
        return (
          <Pressable
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
            onPress={() => {
              onSelect(item.name);
            }}
          >
            <View style={styles.listItemContainer} key={index}>
              <Text style={styles.listItemText}>
                {start}
                <Text style={styles.listItemHighlight}>{match}</Text>
                {end}
              </Text>
              <Image style={styles.listItemImage} source={{ uri: item.uri }} />
            </View>
          </Pressable>
        );
      }}
    />
  );
};

export default SearchList;

const styles = StyleSheet.create({
  listContainer: {
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: "100%",
    maxWidth: 300,
    marginInline: "auto",
  },
  listItemContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  listItemText: {
    fontFamily: "ComicNeue-Bold",
    fontSize: 20,
  },
  listItemHighlight: {
    backgroundColor: palette.highlight,
  },
  listItemImage: {
    width: 46,
    height: 30,
    filter: "grayscale(1) brightness(0.1)",
  },
});
