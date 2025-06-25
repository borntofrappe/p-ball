import Entry from "@/components/Entry";
import Ribbon from "@/components/Ribbon";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const EntryByName = () => {
  const db = useSQLiteContext();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    db.getFirstAsync<EntryDB>("SELECT * FROM entry WHERE name = ?", [
      name,
    ]).then((entryDB) => {
      if (entryDB) {
        const { no, name, category, height, weight, description, img } =
          entryDB;
        const base64Data = btoa(String.fromCharCode.apply(null, img));
        const uri = "data:image/png;base64," + base64Data;

        setEntry({
          no,
          name,
          category,
          height,
          weight,
          description,
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
          <Entry
            no={entry.no}
            name={entry.name}
            category={entry.category}
            height={entry.height}
            weight={entry.weight}
            description={entry.description}
            uri={entry.uri}
          />
        ) : (
          <>
            <Text>{name} not found</Text>
          </>
        )}
      </View>
      <Ribbon />
    </>
  );
};

export default EntryByName;
