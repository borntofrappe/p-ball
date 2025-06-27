import { getAreaByName, getCatchesByName } from "@/api/queries";
import Panel from "@/components/Panel";
import PixelatedImage from "@/components/PixelatedImage";
import { Colors } from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const AreaByName = () => {
  const db = useSQLiteContext();
  const router = useRouter();

  const imageScale = 4;
  const imageWidth = 46 * imageScale;
  const imageHeight = 30 * imageScale;

  const { name } = useLocalSearchParams<{ name: string }>();

  const { data: area } = useQuery({
    queryKey: ["area", { db, name }],
    queryFn: () => getAreaByName({ db, name }),
  });

  const { data: catches } = useQuery({
    queryKey: ["catches", { db, name }],
    queryFn: () => getCatchesByName({ db, name }),
  });

  const selectEntryByName = async (name: string) => {
    router.replace({
      pathname: "/entry/[name]",
      params: {
        name,
      },
    });
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
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
            <Text style={styles.title}>{area.name}</Text>
          </View>
        ) : (
          <>
            <Text>{name} not found</Text>
          </>
        )}

        <View style={[styles.panelsContainer]}>
          {catches &&
            (catches.Red.length > 0 || catches.Blue.length > 0) &&
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
    </>
  );
};

export default AreaByName;

const styles = StyleSheet.create({
  title: {
    fontFamily: "ComicNeue-Bold",
    fontSize: 22,
  },
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
