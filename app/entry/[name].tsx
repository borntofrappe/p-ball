import Entry from "@/components/Entry";
import Panel from "@/components/Panel";
import Ribbon from "@/components/Ribbon";
import { Colors } from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import React, { useRef } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const getEntryByName = async ({
  db,
  name,
}: {
  db: SQLiteDatabase;
  name: string;
}): Promise<Entry | undefined> => {
  const entryDB = await db.getFirstAsync<EntryDB>(
    `
      SELECT *
      FROM entry 
      WHERE name = ?
      `,
    [name]
  );

  if (entryDB) {
    const { no, name, category, height, weight, description, img } = entryDB;
    const base64Data = btoa(String.fromCharCode.apply(null, img));
    const uri = "data:image/png;base64," + base64Data;

    return {
      no,
      name,
      category,
      height,
      weight,
      description,
      uri,
    };
  }
};

const getLocationsByName = async ({
  db,
  name,
}: {
  db: SQLiteDatabase;
  name: string;
}): Promise<{ Red: Area[]; Blue: Area[] } | undefined> => {
  const locationsDB = await db.getAllAsync<{
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
  );

  if (locationsDB) {
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

    return locations;
  }
};

const getConnectionsByName = async ({
  db,
  name,
}: {
  db: SQLiteDatabase;
  name: string;
}): Promise<Array<{ name: string; uri: string }> | undefined> => {
  const connectionsDB = await db.getAllAsync<{ name: string; img: number[] }>(
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
  );

  if (connectionsDB) {
    const connections = connectionsDB.map((connectionDB) => {
      const { name, img } = connectionDB;
      const base64Data = btoa(String.fromCharCode.apply(null, img));
      const uri = "data:image/png;base64," + base64Data;

      return {
        name,
        uri,
      };
    });

    return connections;
  }
};

const EntryByName = () => {
  const db = useSQLiteContext();
  const router = useRouter();
  const page = useRef<ScrollView>(null);

  const { name } = useLocalSearchParams<{ name: string }>();

  const { data: entry } = useQuery({
    queryKey: ["entry", { db, name }],
    queryFn: () => getEntryByName({ db, name }),
  });

  const { data: locations } = useQuery({
    queryKey: ["locations", { db, name }],
    queryFn: () => getLocationsByName({ db, name }),
  });

  const { data: connections } = useQuery({
    queryKey: ["connections", { db, name }],
    queryFn: () => getConnectionsByName({ db, name }),
  });

  const selectEntryByName = async (name: string) => {
    if (entry && entry.name === name) {
      return page.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }

    router.replace({
      pathname: "/entry/[name]",
      params: {
        name,
      },
    });
  };

  const selectAreaByName = async (name: string) => {
    router.replace({
      pathname: "/area/[name]",
      params: {
        name,
      },
    });
  };

  return (
    <>
      <Ribbon />
      <ScrollView
        ref={page}
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
          {locations &&
            (locations.Red.length > 0 || locations.Blue.length > 0) &&
            Object.entries(locations)
              .filter((d) => d[1].length > 0)
              .map(([version, areas]) => (
                <Panel label={version} theme={version as Version} key={version}>
                  {areas.map((area) => (
                    <Pressable
                      onPress={() => {
                        selectAreaByName(area.name);
                      }}
                      key={`${version}-${area.name}`}
                    >
                      <View style={[styles.itemsContainer]}>
                        <Image
                          style={{
                            width: 46,
                            height: 30,
                          }}
                          source={{ uri: area.uri }}
                        />
                        <Text
                          style={[
                            styles.itemsText,
                            {
                              color: Colors.panel[version as Version].color,
                            },
                          ]}
                        >
                          {area.name}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </Panel>
              ))}

          {connections && connections.length > 1 && (
            <Panel label="EVO" theme="Yellow">
              {connections.map((connection) => (
                <Pressable
                  onPress={() => {
                    selectEntryByName(connection.name);
                  }}
                  key={`${connection.name}`}
                >
                  <View style={[styles.itemsContainer]}>
                    <Image
                      style={{
                        width: 46,
                        height: 30,
                      }}
                      source={{ uri: connection.uri }}
                    />
                    <Text
                      style={[
                        styles.itemsText,
                        {
                          color: Colors.panel.Yellow.color,
                        },
                      ]}
                    >
                      {connection.name}
                    </Text>
                  </View>
                </Pressable>
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
    fontSize: 16,
    maxWidth: 80,
    textAlign: "center",
  },
});
