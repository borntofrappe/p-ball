import Ribbon from "@/components/Ribbon";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="p-ball.sqlite3"
      assetSource={{ assetId: require("@/assets/data/p-ball.sqlite3") }}
    >
      <>
        <Ribbon />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="/entry/[name]" />
        </Stack>
        <StatusBar />
      </>
    </SQLiteProvider>
  );
}
