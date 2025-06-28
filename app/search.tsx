import { getMatchesByName } from "@/api/queries";
import LoadingSpinner from "@/components/LoadingSpinner";
import SearchBox from "@/components/SearchBox";
import SearchList from "@/components/SearchList";
import StepAnimation from "@/components/StepAnimation";
import { animationNotFound } from "@/constants/Animations";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Text, View } from "react-native";

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

    setInput(text);
  };

  const selectEntryByName = async (name: string) => {
    router.push({
      pathname: "/entry/[name]",
      params: {
        name,
      },
    });
  };

  return (
    <>
      <View
        style={{
          maxWidth: 500,
          width: "100%",
          marginInline: "auto",
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
      >
        <SearchBox title="Pokemon" onChangeText={search} />
        {searchState === "search" ? (
          <View
            style={{
              marginTop: 16,
              alignSelf: "center",
            }}
          >
            <LoadingSpinner duration={searchDelay / 2.1} />
          </View>
        ) : (
          <>
            <SearchList
              items={searchItems || []}
              onSelect={selectEntryByName}
            />
            {searchItems && searchItems.length === 0 && input && (
              <View
                style={{
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <StepAnimation {...animationNotFound} />
                <Text
                  style={{
                    fontFamily: "ComicNeue-Bold",
                    fontSize: 24,
                  }}
                >
                  Entry not found
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </>
  );
};

export default Search;
