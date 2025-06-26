import Entry from "@/components/Entry";
import Panel from "@/components/Panel";
import Ribbon from "@/components/Ribbon";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const EntryByName = () => {
  const db = useSQLiteContext();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [entry, setEntry] = useState<Entry>();
  const [locations, setLocations] = useState<{ Red: Area[]; Blue: Area[] }>({
    Red: [],
    Blue: [],
  });
  const [connections, setConnections] = useState<
    { name: string; uri: string }[]
  >([]);

  useEffect(() => {
    db.getFirstAsync<EntryDB>(
      `
      SELECT *
      FROM entry 
      WHERE name = ?
      `,
      [name]
    ).then((entryDB) => {
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

    db.getAllAsync<{
      name: string;
      version: Version;
      img: number[];
    }>(
      `
      SELECT name, version, img 
      FROM name_catch 
      JOIN area ON name_catch.area = area.name 
      WHERE entry = ?;
      `,
      [name]
    ).then((locationsDB) => {
      const locations = locationsDB
        .map((locationDB) => {
          const { name, version, img } = locationDB;
          const base64Data = btoa(String.fromCharCode.apply(null, img));
          const uri = "data:image/png;base64," + base64Data;
          return {
            name,
            version,
            uri,
          };
        })
        .reduce<{ Red: Area[]; Blue: Area[] }>(
          (acc, curr) => {
            const { name, version, uri } = curr;
            acc[version].push({
              name,
              uri,
            });
            return acc;
          },
          { Red: [], Blue: [] }
        );
      setLocations(locations);
    });

    db.getAllAsync<{ name: string; img: number[] }>(
      `
      SELECT name, img 
      FROM entry 
      WHERE name IN (
        SELECT base 
        FROM name_evo 
        WHERE evolution = (
          SELECT base FROM name_evo 
          WHERE evolution = $name 
        ) 
        UNION 
        SELECT base 
        FROM name_evo 
        WHERE evolution = $name 
        UNION 
        SELECT $name
        UNION
        SELECT evolution 
        FROM name_evo 
        WHERE base = $name
        UNION
        SELECT evolution 
        FROM name_evo 
        WHERE base = (
          SELECT evolution 
          FROM name_evo 
          WHERE base = $name
        )
      );
      `,
      {
        $name: name,
      }
    ).then((connectionsDB) => {
      setConnections(
        connectionsDB.map((connectionDB) => {
          const { name, img } = connectionDB;
          const base64Data = btoa(String.fromCharCode.apply(null, img));
          const uri = "data:image/png;base64," + base64Data;

          return {
            name,
            uri,
          };
        })
      );
    });

    return () => {};
  }, []);

  return (
    <>
      <Ribbon />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          maxWidth: 500,
          width: "100%",
          marginInline: "auto",
          paddingHorizontal: 16,
          paddingVertical: 16,
          gap: 24,
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

        <View style={[styles.panelsContainer]}>
          {(locations.Red.length > 0 || locations.Blue.length > 0) &&
            Object.entries(locations)
              .filter((d) => d[1].length > 0)
              .map(([version, areas]) => (
                <Panel label={version} key={version}>
                  {areas.map((area) => (
                    <View
                      style={[styles.itemsContainer]}
                      key={`${version}-${area.name}`}
                    >
                      <Image
                        style={{
                          width: 46,
                          height: 30,
                        }}
                        source={{ uri: area.uri }}
                      />
                      <Text style={[styles.itemsText]}>{area.name}</Text>
                    </View>
                  ))}
                </Panel>
              ))}

          {connections.length > 1 && (
            <Panel label="EVO">
              {connections.map((connection) => (
                <View
                  style={[styles.itemsContainer]}
                  key={`${connection.name}`}
                >
                  <Image
                    style={{
                      width: 46,
                      height: 30,
                    }}
                    source={{ uri: connection.uri }}
                  />
                  <Text style={[styles.itemsText]}>{connection.name}</Text>
                </View>
              ))}
            </Panel>
          )}
        </View>
      </ScrollView>
      <Ribbon />
    </>
  );
};

export default EntryByName;

const styles = StyleSheet.create({
  panelsContainer: {
    gap: 16,
  },
  itemsContainer: {
    gap: 12,
    alignItems: "center",
  },
  itemsText: {
    fontFamily: "ComicNeue-Bold",
    color: Colors.text,
    fontSize: 16,
    maxWidth: 80,
    textAlign: "center",
  },
});
