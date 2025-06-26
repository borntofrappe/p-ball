import Panel from "@/components/Panel";
import PixelatedImage from "@/components/PixelatedImage";
import Ribbon from "@/components/Ribbon";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Catch = {
  name: string;
  uri: string;
};

const AreaByName = () => {
  const db = useSQLiteContext();
  const router = useRouter();

  const imageScale = 3;
  const imageWidth = 46 * imageScale;
  const imageHeight = 30 * imageScale;

  const { name } = useLocalSearchParams<{ name: string }>();
  const [area, setArea] = useState<Area>();
  const [catches, setCatches] = useState<{ Red: Catch[]; Blue: Catch[] }>({
    Red: [],
    Blue: [],
  });

  const selectEntryByName = async (name: string) => {
    router.replace({
      pathname: "/entry/[name]",
      params: {
        name,
      },
    });
  };

  useEffect(() => {
    db.getFirstAsync<AreaDB>(
      `
      SELECT *
      FROM area 
      WHERE name = ?
      `,
      [name]
    ).then((areaDB) => {
      if (areaDB) {
        const { name, img } = areaDB;
        const base64Data = btoa(String.fromCharCode.apply(null, img));
        const uri = "data:image/png;base64," + base64Data;

        setArea({
          name,
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
      JOIN entry ON name_catch.entry = entry.name 
      WHERE area = ?;
      `,
      [name]
    ).then((catchesDB) => {
      const catches = catchesDB
        .map((catchDB) => {
          const { name, version, img } = catchDB;
          const base64Data = btoa(String.fromCharCode.apply(null, img));
          const uri = "data:image/png;base64," + base64Data;
          return {
            name,
            version,
            uri,
          };
        })
        .reduce<{ Red: Catch[]; Blue: Catch[] }>(
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
      setCatches(catches);
    });
  });

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
        {area ? (
          <View style={[styles.itemsContainer]}>
            <PixelatedImage
              width={imageWidth}
              height={imageHeight}
              uri={area.uri}
            />
            <Text>{area.name}</Text>
          </View>
        ) : (
          <>
            <Text>{name} not found</Text>
          </>
        )}

        <View style={[styles.panelsContainer]}>
          {(catches.Red.length > 0 || catches.Blue.length > 0) &&
            Object.entries(catches)
              .filter((d) => d[1].length > 0)
              .map(([version, entries]) => (
                <Panel label={version} theme={version as Version} key={version}>
                  {entries.map((entry) => (
                    <Pressable
                      onPress={() => {
                        selectEntryByName(entry.name);
                      }}
                      key={`${version}-${entry.name}`}
                    >
                      <View style={[styles.itemsContainer]}>
                        <Image
                          style={{
                            width: 46,
                            height: 30,
                          }}
                          source={{ uri: entry.uri }}
                        />
                        <Text
                          style={[
                            styles.itemsText,
                            {
                              color: Colors.panel[version as Version].color,
                            },
                          ]}
                        >
                          {entry.name}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </Panel>
              ))}
        </View>
      </ScrollView>
      <Ribbon />
    </>
  );
};

export default AreaByName;

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
