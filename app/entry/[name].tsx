import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Entry = () => {
  const { name } = useLocalSearchParams<{ name: string }>();
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default Entry;
