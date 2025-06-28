import { getEntryByCatchCounter } from "@/api/queries";
import Entry from "@/components/Entry";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { View } from "react-native";

type Guess = {
  no: string;
  name: string;
  category: string;
  uri: string;
};
const Catch = () => {
  const db = useSQLiteContext();

  const STORAGE_KEY = "catch-counter";

  const {
    data: entry,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["catch"],
    queryFn: () =>
      getEntryByCatchCounter({
        db,
        catchCounter: localStorage.getItem(STORAGE_KEY) || "0",
      }),
  });

  const [guess, setGuess] = useState<Guess>({
    no: " ",
    name: " ",
    category: " ",
    uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAeCAMAAABkHdyoAAAASFBMVEWoqKj4+vj6+Pj4+fj4+Pv5+Pj4+Pr4+Pn4+Piqqqqoq6ipqqmoqqqoqqirqKipqaiqqKqoqaqqqKioqaipqKmpqKioqKqoqKkc5p6VAAABI0lEQVR42qWUjVbDIAyFr8VtqYo6YuD931Sh/KSpdMfjd3bWQG+TNCEFGHs8DkT8Ce1E8JBwFptBBS3m/BvSVIN4D1BHBWfssolf2LgSuWs26OYcPcqwObV2YsTh/a1sFQU629Lwruyn/W0pet9qz+pOWSn1Z/MvOHL/LbbULdt46amqnoy9CUQL2NRkyz7AJxg4S+orrCuRcf/Ra1r/qLP+kK+OMpMuUWFRcjLykZH0sJNkYA6PJyXRZgkdBGIiEMUxPrIdXJt65FSfiNRrkw6nJuHIhdrIhBw6ZPkWqO7btj7b5y+Qs7FbRk8SHNHZWEe24+ExgYeGhiHZR0td7Ll8abqliG3KehkZob+hoxs0upYcMCNEf9QH4FV9DLlYd/ybb9YCDv4mNKpOAAAAAElFTkSuQmCC",
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
          no={guess.no}
          name={guess.name}
          category={guess.category}
          height={entry.height}
          weight={entry.weight}
          description={entry.description}
          uri={guess.uri}
        />
      )}
    </View>
  );
};

export default Catch;
