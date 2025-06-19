// import { useSQLiteContext } from "expo-sqlite";
import SearchBox from "@/components/SearchBox";
import { StyleSheet, View } from "react-native";

const Index = () => {
  // const db = useSQLiteContext();

  const onChangeText = (text: string) => {};
  return (
    <View style={styles.pageContainer}>
      <SearchBox title="Pokemon" onChangeText={onChangeText} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  pageContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});
