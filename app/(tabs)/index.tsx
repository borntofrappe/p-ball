import SearchBox from "@/components/SearchBox";
import SearchList from "@/components/SearchList";
import { Sizes } from "@/constants/Sizes";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { View } from "react-native";

const Index = () => {
  const db = useSQLiteContext();

  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);

  const onChangeText = async (text: string) => {
    if (text.trim() === "") {
      setSearchItems([]);
      return;
    }

    const entries: Entry[] = await db.getAllAsync(
      "SELECT * FROM entry WHERE name LIKE ?",
      [`%${text}%`]
    );

    setSearchItems(
      entries.map(({ name, img }) => {
        const base64Data = btoa(String.fromCharCode.apply(null, img));
        const uri = "data:image/png;base64," + base64Data;

        return {
          name,
          uri,
        };
      })
    );
  };
  return (
    <View
      style={{
        maxWidth: Sizes.content.maxWidth,
        width: "100%",
        marginInline: "auto",
        paddingHorizontal: Sizes.content.paddingHorizontal,
        paddingVertical: Sizes.content.paddingVertical,
      }}
    >
      <SearchBox title="Pokemon" onChangeText={onChangeText} />
      <SearchList items={searchItems} />
    </View>
  );
};

export default Index;
