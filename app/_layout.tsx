import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import { StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "ComicNeue-Bold": require("../assets/fonts/ComicNeue-Bold.ttf"),
    "ComicNeue-Regular": require("../assets/fonts/ComicNeue-Regular.ttf"),
    PixelEntry: require("../assets/fonts/PixelEntry.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SQLiteProvider
      databaseName="p-ball.sqlite3"
      assetSource={{ assetId: require("@/assets/data/p-ball.sqlite3") }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="entry/[name]" />
      </Stack>
      <StatusBar />
    </SQLiteProvider>
  );
}
