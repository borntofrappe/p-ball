import {
  getConnectionsByName,
  getEntryByName,
  getLocationsByName,
} from "@/api/queries";
import Entry from "@/components/Entry";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import Panel from "@/components/Panel";
import { Colors } from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useRef } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const EntryByName = () => {
  const db = useSQLiteContext();
  const router = useRouter();
  const page = useRef<ScrollView>(null);

  const { name } = useLocalSearchParams<{ name: string }>();

  const {
    data: entry,
    error,
    isLoading,
  } = useQuery({
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

  if (error) {
    return (
      <View
        style={{
          marginTop: 16,
          alignSelf: "center",
        }}
      >
        <ErrorMessage error={error} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View
        style={{
          marginTop: 16,
          alignSelf: "center",
        }}
      >
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <>
      <ScrollView ref={page} contentContainerStyle={[styles.pageContainer]}>
        {entry && (
          <Entry
            no={entry.no}
            name={entry.name}
            category={entry.category}
            height={entry.height}
            weight={entry.weight}
            description={entry.description}
            uri={entry.uri}
          />
        )}

        <View style={[styles.panelsContainer]}>
          {locations &&
            (locations.Red.length > 0 || locations.Blue.length > 0) &&
            Object.entries(locations)
              .filter((d) => d[1].length > 0)
              .map(([version, areas]) => (
                <Panel label={version} theme={version as Version} key={version}>
                  {areas.map((area) => (
                    <TouchableOpacity
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
                    </TouchableOpacity>
                  ))}
                </Panel>
              ))}

          {connections && connections.length > 1 && (
            <Panel label="EVO" theme="Yellow">
              {connections.map((connection) => (
                <TouchableOpacity
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
                </TouchableOpacity>
              ))}
            </Panel>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default EntryByName;

const styles = StyleSheet.create({
  pageContainer: {
    maxWidth: 500,
    width: "100%",
    marginInline: "auto",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 20,
  },
  panelsContainer: {
    gap: 16,
  },
  itemsContainer: {
    gap: 6,
    alignItems: "center",
  },
  itemsText: {
    fontFamily: "ComicNeue-Bold",
    fontSize: 16,
    maxWidth: 80,
    textAlign: "center",
  },
});
