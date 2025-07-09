import { getAreaByName, getCatchesByName } from "@/api/queries";
import Background from "@/components/Background";
import ErrorMessage from "@/components/ErrorMessage";
import Item from "@/components/Item";
import LoadingSpinner from "@/components/LoadingSpinner";
import Panel from "@/components/Panel";
import PixelatedImage from "@/components/PixelatedImage";
import {
  pageContainer,
  palette,
  panelsContainer,
  singleContainer,
} from "@/lib/styles";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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

  const selectEntryByName = (name: string) => {
    router.replace({
      pathname: "/entry/[name]",
      params: {
        name,
      },
    });
  };

  if (error) {
    return (
      <View style={[singleContainer]}>
        <ErrorMessage error={error} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={[singleContainer]}>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <>
      <Background />
      <ScrollView contentContainerStyle={[pageContainer]}>
        {area && (
          <View style={[styles.titleContainer]}>
            <PixelatedImage
              width={imageWidth}
              height={imageHeight}
              uri={area.uri}
            />
            <Text style={styles.titleText}>{area.name}</Text>
          </View>
        )}

        <View
          style={[
            panelsContainer,
            {
              marginTop: 16,
            },
          ]}
        >
          {catches &&
            (catches.Red.length > 0 || catches.Blue.length > 0) &&
            Object.entries(catches)
              .filter((d) => d[1].length > 0)
              .map(([version, entries]) => (
                <Panel label={version} theme={version as Version} key={version}>
                  {entries.map((entry) => (
                    <TouchableOpacity
                      onPress={() => {
                        selectEntryByName(entry.name);
                      }}
                      key={`${version}-${entry.name}`}
                    >
                      <Item
                        name={entry.name}
                        uri={entry.uri}
                        textStyle={{
                          color: palette.panel[version as Version].color,
                        }}
                      />
                    </TouchableOpacity>
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
  titleContainer: {
    gap: 8,
    alignItems: "center",
  },
  titleText: {
    fontFamily: "ComicNeue-Bold",
    fontSize: 26,
  },
});
