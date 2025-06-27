import { getMatchesByName } from "@/api/queries";
import ActivityIndicator from "@/components/ActivityIndicator";
import Ribbon from "@/components/Ribbon";
import SearchBox from "@/components/SearchBox";
import SearchList from "@/components/SearchList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { ImageBackground, Text, View } from "react-native";

const imageNotFound = require("@/assets/images/entry-not-found.png");
type SearchState = undefined | "search" | "find";

const Index = () => {
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
      <Ribbon />
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
              width: 180,
              height: 180,
              alignSelf: "center",
              marginTop: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              width={120}
              height={120}
              duration={searchDelay / 2.1}
            />
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
                <View
                  style={{
                    width: 150,
                    height: 150,
                    overflow: "hidden",
                  }}
                >
                  <ImageBackground
                    style={{
                      width: 450,
                      height: 150,
                      left: -150,
                    }}
                    source={imageNotFound}
                  ></ImageBackground>
                </View>
                <Text
                  style={{
                    fontFamily: "Poppins-Bold",
                    fontSize: 20,
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

export default Index;
