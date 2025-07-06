import { getSearchEntries } from "@/api/queries";
import LoadingSpinner from "@/components/LoadingSpinner";
import SearchBox from "@/components/SearchBox";
import SearchList from "@/components/SearchList";
import StepAnimation from "@/components/StepAnimation";
import { animationNotFound } from "@/lib/animations";
import { pageContainer, singleContainer } from "@/lib/styles";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type status = undefined | "pending" | "resolve";

const Search = () => {
  const db = useSQLiteContext();

  const { data: searchEntries } = useQuery({
    queryKey: ["search", { db }],
    queryFn: () => getSearchEntries({ db }),
  });

  const router = useRouter();
  const [filter, setFilter] = useState(new RegExp(""));

  const [value, setValue] = useState("");
  const [status, setStatus] = useState<status>();
  let [timeoutID, setTimeoutID] = useState<number>();
  const timeout = 1200;

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
    setValue("");
  };

  const entries =
    searchEntries && searchEntries.filter((d) => filter.test(d.name));

  return (
    <>
      <View style={[pageContainer]}>
        <SearchBox title="Pokemon" value={value} onChangeText={processValue} />
        {status === "pending" ? (
          <View style={[singleContainer]}>
            <LoadingSpinner duration={timeout / 1.5} />
          </View>
        ) : (
          <>
            {entries && entries.length > 0 ? (
              <SearchList
                items={entries}
                onSelect={selectEntryByName}
                highlight={value}
              />
            ) : (
              <View style={[singleContainer]}>
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
  notFoundContainer: {
    alignItems: "center",
    gap: 8,
  },
  notFoundText: {
    fontFamily: "ComicNeue-Bold",
    fontSize: 28,
  },
});
