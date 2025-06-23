import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";

type Props = {
  items: SearchItem[];
};

const SearchList = ({ items }: Props) => {
  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={items}
      renderItem={({ item, index }) => (
        <View style={styles.itemContainer} key={index}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Image
            width={46}
            height={30}
            style={styles.itemImage}
            source={{ uri: item.uri }}
          />
        </View>
      )}
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
    maxWidth: 280,
    marginInline: "auto",
  },
  itemContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
    //
  },
  itemImage: {
    width: 46,
    height: 30,
    filter: [{ grayscale: 1 }, { brightness: 0.05 }],

    //
  },
  itemName: {
    fontWeight: 700,
    fontSize: 18,
  },
});
