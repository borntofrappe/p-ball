import Ribbon from "@/components/Ribbon";
import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
const navIcon = require("@/assets/images/nav-icon.png");
const navPattern = require("@/assets/images/nav-pattern-2.png");

const iconSize = 36;
const itemHeight = iconSize * 0.8;
const itemPaddingHorizontal = [iconSize * 0.65, iconSize * 0.2];
const fontSize = itemHeight * 0.85;
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
    <View style={{flex: 1}}>
      <Ribbon />
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
    </View>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  navPattern: {
    position: "absolute",
    width: patternWidth,
    height: itemHeight,
    right: patternWidth * -1,
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
    width: "100%",
    fontSize,
    color: Colors.text,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  navTextFocus: {
    width: "100%",
    paddingLeft: itemPaddingHorizontal[0],
    paddingRight: itemPaddingHorizontal[1],
    fontSize,
    height: itemHeight,
    color: Colors.white,
    backgroundColor: Colors.text,
    fontWeight: 700,
    textTransform: "uppercase",
  },
});
