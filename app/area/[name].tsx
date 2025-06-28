import { getAreaByName, getCatchesByName } from "@/api/queries";
import ActivityIndicator from "@/components/ActivityIndicator";
import Panel from "@/components/Panel";
import PixelatedImage from "@/components/PixelatedImage";
import StepAnimation from "@/components/StepAnimation";
import { animationError } from "@/constants/Animations";
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

  const {
    data: area,
    error,
    isLoading,
  } = useQuery({
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

  if (error) {
    return (
      <View
        style={{
          marginTop: 16,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            width: animationError.size,
            height: animationError.size,
            marginTop: 16,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StepAnimation {...animationError} />
        </View>

        <Text
          style={{
            fontFamily: "ComicNeue-Bold",
            fontSize: 20,
            maxWidth: 360,
            textAlign: "center",
          }}
        >
          {error.message}
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View
        style={{
          width: 180,
          height: 180,
          alignSelf: "center",
          marginTop: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator width={120} height={120} duration={1000} />
      </View>
    );
  }

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
