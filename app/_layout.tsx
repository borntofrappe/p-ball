import Ribbon from "@/components/Ribbon";
import { fontFamily } from "@/lib/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import { StatusBar, View } from "react-native";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { comicBold, pixelEntry, poppinsBold } = fontFamily;

  const [loaded, error] = useFonts({
    [comicBold]: require("@/assets/fonts/ComicNeue-Bold.ttf"),
    [pixelEntry]: require("@/assets/fonts/PixelEntry.ttf"),
    [poppinsBold]: require("@/assets/fonts/Poppins-Bold.ttf"),
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
    <QueryClientProvider client={queryClient}>
      <SQLiteProvider
        databaseName="p-ball.sqlite3"
        assetSource={{ assetId: require("@/assets/data/p-ball.sqlite3") }}
      >
        <Ribbon />
        {/* flex: 1 to scroll FlatList */}
        <View style={[{ flex: 1 }]}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="search" />
            <Stack.Screen name="catch" />
            <Stack.Screen name="entry/[name]" />
            <Stack.Screen name="area/[name]" />
          </Stack>
          <StatusBar />
        </View>
        <Ribbon />
      </SQLiteProvider>
    </QueryClientProvider>
  );
}
