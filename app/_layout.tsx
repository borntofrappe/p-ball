import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="p-ball.sqlite3"
      assetSource={{ assetId: require("@/assets/data/p-ball.sqlite3") }}
    >
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ title: "Home", headerShown: false }}
        />
      </Stack>
      <StatusBar />
    </SQLiteProvider>
  );
}
