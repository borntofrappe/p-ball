import {
  borderRadius,
  fontFamily,
  fontSize,
  palette,
  size,
  imageSize,
  grayScaleContainer,
} from "@/lib/styles";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  items: { name: string; uri: string }[];
  onSelect: (text: string) => void;
  highlight?: string;
};

const ITEM_HEIGHT = 60;

const SearchList = ({ items, onSelect, highlight = "" }: Props) => {
  const regex = new RegExp(highlight, "i");
  const { length } = highlight;
  const { width, height } = imageSize;
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
        const text = item.name;
        const from = text.search(regex);
        const to = from + length;
        const start = text.slice(0, from);
        const match = text.slice(from, to);
        const end = text.slice(to);
        return (
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            onPress={() => {
              onSelect(item.name);
            }}
          >
            <View
              style={[
                styles.listItemContainer,
                {
                  height: ITEM_HEIGHT,
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                },
              ]}
            >
              <Text style={[styles.listItemText]}>
                {start}
                <Text style={[styles.listItemHighlight]}>{match}</Text>
                {end}
              </Text>
              <View style={[styles.listItemImageContainer]}>
                <View style={[grayScaleContainer]}>
                  <Image
                    style={[
                      {
                        width,
                        height,
                      },
                    ]}
                    source={{ uri: item.uri }}
                  />
                </View>
              </View>
            </View>
          </Pressable>
        );
      }}
      contentContainerStyle={[styles.listContainer]}
      keyExtractor={(item) => item.name}
      getItemLayout={(_, index) => {
        return {
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        };
      }}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SearchList;

const styles = StyleSheet.create({
  listContainer: {
    gap: size[1],
  },
  listItemContainer: {
    backgroundColor: palette.searchItem.backgroundColor,
    borderRadius: borderRadius[2],
  },
  listItemText: {
    fontFamily: fontFamily.pixelEntry,
    fontSize: fontSize.medium,
    letterSpacing: 0.2,
    color: palette.searchItem.color,
  },
  listItemHighlight: {
    color: palette.searchItem.highlight,
  },
  listItemImageContainer: {
    backgroundColor: palette.white,
  },
});
