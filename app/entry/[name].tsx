import {
  getConnectionsByName,
  getEntryByName,
  getLocationsByName,
} from "@/api/queries";
import Background from "@/components/Background";
import Entry from "@/components/Entry";
import ErrorMessage from "@/components/ErrorMessage";
import Item from "@/components/Item";
import LoadingSpinner from "@/components/LoadingSpinner";
import Panel from "@/components/Panel";
import {
  centerContainer,
  pageContainer,
  palette,
  panelsContainer,
  size,
} from "@/lib/styles";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useRef } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const EntryByName = () => {
  const db = useSQLiteContext();
  const router = useRouter();

  const pageStart = useRef<ScrollView>(null);

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

  const selectEntryByName = (name: string) => {
    if (entry && entry.name === name) {
      return pageStart.current?.scrollTo({
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

  const selectAreaByName = (name: string) => {
    router.replace({
      pathname: "/area/[name]",
      params: {
        name,
      },
    });
  };

  if (error) {
    return (
      <View style={[centerContainer]}>
        <ErrorMessage error={error} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={[centerContainer]}>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <>
      <Background />
      <ScrollView ref={pageStart} contentContainerStyle={[pageContainer]}>
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
                      <Item
                        name={area.name}
                        uri={area.uri}
                        textStyle={{
                          color: palette.panel[version as Version].color,
                        }}
                      />
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
                  <Item
                    name={connection.name}
                    uri={connection.uri}
                    textStyle={{
                      color: palette.panel.Yellow.color,
                    }}
                  />
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
  panelsContainer: {
    marginTop: size[2],
    gap: size[2],
  },
});
