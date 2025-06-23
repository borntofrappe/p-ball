import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const tabIcon = require("@/assets/images/tab-icon.png");
const tabPattern = require("@/assets/images/tab-pattern.png");

const iconSize = 36;
const itemHeight = iconSize * 0.8;
const itemPaddingHorizontal = [iconSize * 0.65, iconSize * 0.2];
const fontSize = itemHeight * 0.8;
const tabHeight = iconSize * 1.25;
const patternWidth = (itemHeight / 64) * 18;

const TabBarIcon = ({
  title,
  focused,
}: {
  title: string;
  focused: boolean;
}) => {
  if (focused) {
    return (
      <View>
        <Image source={tabIcon} style={[styles.tabIcon]} />
        <Text style={[styles.tabTextFocus]}>{title}</Text>
        <Image source={tabPattern} style={[styles.tabPattern]} />
      </View>
    );
  }
  return (
    <View>
      <Text style={[styles.tabText]}>{title}</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: (tabHeight - iconSize) / 2,
          backgroundColor: Colors.primary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon focused={focused} title="Search" />;
          },
        }}
      />
      <Tabs.Screen
        name="catch"
        options={{
          title: "Catch",
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon focused={focused} title="Catch" />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabPattern: {
    position: "absolute",
    width: patternWidth,
    height: itemHeight,
    right: patternWidth * -1,
  },
  tabIcon: {
    position: "absolute",
    width: iconSize,
    height: iconSize,
    zIndex: 1,
    left: (iconSize / 2) * -1,
    top: ((iconSize - itemHeight) / 2) * -1,
  },
  tabText: {
    fontSize,
    width: "100%",
    height: itemHeight,
    color: Colors.text,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  tabTextFocus: {
    fontSize,
    width: "100%",
    height: itemHeight,
    paddingLeft: itemPaddingHorizontal[0],
    paddingRight: itemPaddingHorizontal[1],
    color: Colors.white,
    backgroundColor: Colors.text,
    fontWeight: 700,
    textTransform: "uppercase",
  },
});
