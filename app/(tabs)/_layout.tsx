import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Search" }} />
      <Tabs.Screen name="catch" options={{ title: "Catch" }} />
    </Tabs>
  );
};

export default TabsLayout;
