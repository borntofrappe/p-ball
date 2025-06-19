// import { useSQLiteContext } from "expo-sqlite";
import SearchBox from "@/components/SearchBox";
import { View } from "react-native";

const Index = () => {
  // const db = useSQLiteContext();

  const onChangeText = (text: string) => {};
  return (
    <View>
      <SearchBox title="Pokemon" onChangeText={onChangeText} />
    </View>
  );
};

export default Index;
