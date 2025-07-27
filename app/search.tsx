import { getEntriesData } from "@/api/queries";
import Background from "@/components/Background";
import LoadingSpinner from "@/components/LoadingSpinner";
import SearchBox from "@/components/SearchBox";
import SearchList from "@/components/SearchList";
import StepAnimation from "@/components/StepAnimation";
import { animationNotFound } from "@/lib/animations";
import {
  centerContainer,
  fontFamily,
  fontSize,
  pageContainer,
  size,
} from "@/lib/styles";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type status = undefined | "pending" | "resolve";

const Search = () => {
  const db = useSQLiteContext();

  const { data: entries } = useQuery({
    queryKey: ["search", { db }],
    queryFn: () => getEntriesData({ db }),
  });

  const router = useRouter();

  const [filter, setFilter] = useState(new RegExp(""));
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<status>();
  let [timeoutID, setTimeoutID] = useState<number>();
  const timeout = 1200;

  const resetValue = () => {
    setValue("");
    setFilter(new RegExp(""));
    setStatus("resolve");
  };

  const processValue = (text: string) => {
    setValue(text);

    clearTimeout(timeoutID);
    if (text === "") {
      setFilter(new RegExp(""));
      setStatus("resolve");
    } else {
      const id = setTimeout(() => {
        setFilter(new RegExp(text, "i"));
        setStatus("resolve");
      }, timeout);

      setStatus("pending");
      setTimeoutID(id);
    }
  };

  const selectEntryByName = (name: string) => {
    router.push({
      pathname: "/entry/[name]",
      params: {
        name,
      },
    });
  };

  const searchEntries = entries && entries.filter((d) => filter.test(d.name));

  return (
    <>
      <Background />
      <View
        style={[
          pageContainer,
          {
            flex: 1, // scroll FlatList
          },
        ]}
      >
        <SearchBox
          value={value}
          onChangeText={processValue}
          onClearText={resetValue}
        />
        {status === "pending" ? (
          <View
            style={[
              centerContainer,
              {
                marginTop: size[3],
              },
            ]}
          >
            <LoadingSpinner duration={timeout / 1.5} />
          </View>
        ) : (
          <>
            {searchEntries && searchEntries.length > 0 ? (
              <View
                style={[
                  styles.entriesContainer,
                  {
                    flex: 1, // scroll FlatList
                  },
                ]}
              >
                <SearchList
                  items={searchEntries}
                  onSelect={selectEntryByName}
                  highlight={value}
                />
              </View>
            ) : (
              <View
                style={[
                  centerContainer,
                  {
                    marginTop: size[3],
                  },
                ]}
              >
                <View style={[styles.notFoundContainer]}>
                  <StepAnimation {...animationNotFound} />
                  <Text style={[styles.notFoundText]}>Not even a nibble</Text>
                </View>
              </View>
            )}
          </>
        )}
      </View>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  entriesContainer: {
    marginTop: size[2],
    marginHorizontal: size[1],
  },
  notFoundContainer: {
    alignItems: "center",
    gap: size[1],
  },
  notFoundText: {
    fontFamily: fontFamily.comicBold,
    fontSize: fontSize.large,
  },
});
