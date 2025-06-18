// import { useSQLiteContext } from "expo-sqlite";
import Ribbon from "@/components/Ribbon";
import { Text, View } from "react-native";

const Index = () => {
  // const db = useSQLiteContext();
  return (
    <View>
      <Ribbon />
      <Text>Search</Text>
    </View>
  );
};

export default Index;
