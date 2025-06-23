// import { useSQLiteContext } from "expo-sqlite";
import SearchBox from "@/components/SearchBox";
import { Sizes } from "@/constants/Sizes";
import { View } from "react-native";

const Index = () => {
  // const db = useSQLiteContext();

  const onChangeText = (text: string) => {};
  return (
    <View
      style={{
        maxWidth: Sizes.content.maxWidth,
        width: "100%",
        marginInline: "auto",
        paddingHorizontal: Sizes.content.paddingHorizontal,
        paddingVertical: Sizes.content.paddingVertical,
      }}
    >
      <SearchBox title="Pokemon" onChangeText={onChangeText} />
    </View>
  );
};

export default Index;
