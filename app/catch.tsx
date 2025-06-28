import { getEntryByCatchCounter } from "@/api/queries";
import Entry from "@/components/Entry";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { View } from "react-native";

const Catch = () => {
  const db = useSQLiteContext();

  const {
    data: entry,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["catch"],
    queryFn: () =>
      getEntryByCatchCounter({
        db,
        catchCounter: localStorage.getItem("catch-counter") || "0",
      }),
  });

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
    <View
      style={{
        maxWidth: 500,
        width: "100%",
        marginInline: "auto",
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 24,
      }}
    >
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
    </View>
  );
};

export default Catch;
