import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="p-ball.sqlite3"
      assetSource={{ assetId: require("@/assets/data/p-ball.sqlite3") }}
    >
      <Stack />
    </SQLiteProvider>
  );
}
