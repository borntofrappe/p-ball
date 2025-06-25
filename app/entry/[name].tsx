import Ribbon from "@/components/Ribbon";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

const Entry = () => {
  const db = useSQLiteContext();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    db.getFirstAsync<EntryDB>("SELECT * FROM entry WHERE name = ?", [
      name,
    ]).then((entryDB) => {
      if (entryDB) {
        const { name, no, description, weight, height, img } = entryDB;
        const base64Data = btoa(String.fromCharCode.apply(null, img));
        const uri = "data:image/png;base64," + base64Data;

        setEntry({
          name,
          no,
          description,
          weight,
          height,
          uri,
        });
      }
    });

    return () => {};
  }, []);

  return (
    <>
      <Ribbon />
      <View
        style={{
          flex: 1,
          maxWidth: 500,
          width: "100%",
          marginInline: "auto",
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
      >
        {entry ? (
          <View>
            <Text>{entry.name}</Text>
            <Text>{entry.description}</Text>
            <Text>W {entry.weight}</Text>
            <Text>H {entry.height}</Text>
            <Image
              width={46}
              height={30}
              style={{
                width: 46,
                height: 30,
              }}
              source={{ uri: entry.uri }}
            />
          </View>
        ) : (
          <View>
            <Text>{name} not found</Text>
          </View>
        )}
      </View>
      <Ribbon />
    </>
  );
};

export default Entry;
