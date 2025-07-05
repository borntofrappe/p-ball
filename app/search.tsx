import { getMatchesByName } from "@/api/queries";
import LoadingSpinner from "@/components/LoadingSpinner";
import SearchBox from "@/components/SearchBox";
import SearchList from "@/components/SearchList";
import StepAnimation from "@/components/StepAnimation";
import { animationNotFound } from "@/lib/animations";
import { pageContainer, singleContainer } from "@/lib/styles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type SearchState = undefined | "search" | "find";

const Search = () => {
  const queryClient = useQueryClient();
  const db = useSQLiteContext();

  const router = useRouter();

  const [input, setInput] = useState("");
  const { data: searchItems } = useQuery({
    queryKey: ["input", { db, name: input }],
    queryFn: () => getMatchesByName({ db, name: input }),
  });

  const [searchState, setSearchState] = useState<SearchState>();
  let [timeoutID, setTimeoutID] = useState<number>();
  const searchDelay = 1600;

  const searchEntryByName = async (name: string) => {
    await queryClient.invalidateQueries({ queryKey: ["input"] });
    setSearchState("find");
  };

  const search = (text: string) => {
    setInput(text);
    clearTimeout(timeoutID);
    if (text === "") {
      searchEntryByName(text);
    } else {
      let id = setTimeout(() => {
        searchEntryByName(text);
        clearTimeout(id);
      }, searchDelay);

      setSearchState("search");
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
    setInput("");
  };

  return (
    <>
      <View style={[pageContainer]}>
        <SearchBox title="Pokemon" value={input} onChangeText={search} />
        {searchState === "search" ? (
          <View style={[singleContainer]}>
            <LoadingSpinner duration={searchDelay / 2.1} />
          </View>
        ) : (
          <>
            <SearchList
              items={searchItems || []}
              onSelect={selectEntryByName}
              highlight={input}
            />
            {searchItems && searchItems.length === 0 && input && (
              <View style={[styles.notFoundContainer]}>
                <StepAnimation {...animationNotFound} />
                <Text style={[styles.notFoundText]}>Entry not found</Text>
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
