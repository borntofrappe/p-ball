import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
const navIcon = require("@/assets/images/nav-icon.png");
const navPattern = require("@/assets/images/nav-pattern-2.png");

const iconSize = 40;
const itemHeight = iconSize * 0.8;
const itemPaddingHorizontal = [iconSize * 0.65, iconSize * 0.2];
const fontSize = itemHeight * 0.725;
const tabHeight = iconSize * 1.3;

const TabBarIcon = ({ title, focused }: { title: string; focused: boolean }) => {
  if (focused) {
    return (
      <View style={[styles.navPill]}>
        <Image source={navIcon} style={[styles.navIcon]} />
        <Text style={[styles.navTextFocus]}>{title}</Text>
        <Image source={navPattern} style={[styles.navPattern]} />
      </View>
    );
  }
  return (
    <View>
      <Text style={[styles.navText]}>{title}</Text>
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
          height: tabHeight,
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
  navPill: {
    height: itemHeight,
    flexDirection: "row",
    marginLeft: itemPaddingHorizontal[1] - itemPaddingHorizontal[0],
  },
  navPattern: {
    width: (itemHeight / 64) * 18,
    height: itemHeight,
  },
  navIcon: {
    position: "absolute",
    width: iconSize,
    height: iconSize,
    zIndex: 1,
    left: (iconSize / 2) * -1,
    top: ((iconSize - itemHeight) / 2) * -1,
    transform: [
      {
        rotate: "-45deg",
      },
    ],
  },
  navText: {
    fontSize,
    color: Colors.text,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  navTextFocus: {
    paddingLeft: itemPaddingHorizontal[0],
    paddingRight: itemPaddingHorizontal[1],
    fontSize,
    color: Colors.white,
    backgroundColor: Colors.text,
    fontWeight: 700,
    textTransform: "uppercase",
  },
});
