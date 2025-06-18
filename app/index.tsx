import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const db = useSQLiteContext();

  useEffect(() => {
    (async () => {
      const data = await db.getAllAsync("SELECT * FROM version");
      console.log(data);
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hi hi</Text>
    </View>
  );
}
