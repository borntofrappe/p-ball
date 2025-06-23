import SearchBox from "@/components/SearchBox";
import SearchList from "@/components/SearchList";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { ImageBackground, Text, View } from "react-native";
const imageNotFound = require("@/assets/images/not-found.png");

const Index = () => {
  const db = useSQLiteContext();
  const router = useRouter();

  const [input, setInput] = useState("");
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);

  const onChangeText = async (text: string) => {
    if (text.trim() === "") {
      setSearchItems([]);
    } else {
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
    }

    setInput(text);
  };

  const onSelectEntry = async (name: string) => {
    router.push({
      pathname: "/entry/[name]",
      params: {
        name,
      },
    });
  };
  return (
    <View
      style={{
        maxWidth: 500,
        width: "100%",
        marginInline: "auto",
        paddingHorizontal: 16,
        paddingVertical: 16,
      }}
    >
      <SearchBox title="Pokemon" onChangeText={onChangeText} />
      <SearchList items={searchItems} onSelect={onSelectEntry} />
      {searchItems.length === 0 && input && (
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
                left: -150,
              }}
              source={imageNotFound}
            ></ImageBackground>
          </View>
          <Text
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: 20,
            }}
          >
            Entry not found
          </Text>
        </View>
      )}
    </View>
  );
};

export default Index;
