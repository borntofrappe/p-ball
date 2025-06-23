import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
const imageEmptyComponent = require("@/assets/images/missing-data.png");

type Props = {
  items: SearchItem[];
  onSelect: (text: string) => void;
};

const SearchList = ({ items, onSelect }: Props) => {
  return (
    <FlatList
      ListEmptyComponent={
        <View
          style={{
            alignItems: "center",
            gap: 16,
          }}
        >
          <View
            style={{
              width: 150,
              height: 150,
              overflow: "hidden",
            }}
          >
            <ImageBackground
              style={{
                width: 450,
                height: 150,
                // left: -150,
              }}
              source={imageEmptyComponent}
            ></ImageBackground>
          </View>
          <Text
            style={{
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            Entry not found
          </Text>
        </View>
      }
      contentContainerStyle={styles.listContainer}
      data={items}
      renderItem={({ item, index }) => (
        <Pressable
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
          onPress={() => {
            onSelect(item.name);
          }}
        >
          <View style={styles.itemContainer} key={index}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Image
              width={46}
              height={30}
              style={styles.itemImage}
              source={{ uri: item.uri }}
            />
          </View>
        </Pressable>
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
  },
  itemImage: {
    width: 46,
    height: 30,
    filter: [{ grayscale: 1 }, { brightness: 0.15 }],
  },
  itemName: {
    fontWeight: 700,
    fontSize: 18,
  },
});
