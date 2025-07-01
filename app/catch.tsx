import { getEntryByCatchCounter } from "@/api/queries";
import Entry from "@/components/Entry";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { pageContainer, palette, singleContainer } from "@/lib/styles";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useRef, useState } from "react";
import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const imagePaddle = require("@/assets/images/catch-paddle.png");

type PaddleProps = {
  angle: number;
  imageStyles?: StyleProp<ImageStyle>;
};

const Paddle = ({ angle, imageStyles = {} }: PaddleProps) => {
  return (
    <Image
      style={[
        {
          width: 60,
          height: 30,
        },
        imageStyles,
        {
          transform: [
            {
              rotateZ: `${angle}deg`,
            },
          ],
        },
      ]}
      source={imagePaddle}
    />
  );
};

const Catch = () => {
  const db = useSQLiteContext();

  const {
    data: entry,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["catch"],
    queryFn: () =>
      getEntryByCatchCounter({
        db,
        catchCounter: "0",
      }),
  });

  const textInput = useRef<TextInput>(null);
  const [caught, setCaught] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [guess, setGuess] = useState<Entry>({
    no: " ",
    name: " ",
    category: " ",
    height: -1,
    weight: -1,
    description: " ",
    uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAeCAMAAABkHdyoAAAASFBMVEWoqKj4+vj6+Pj4+fj4+Pv5+Pj4+Pr4+Pn4+Piqqqqoq6ipqqmoqqqoqqirqKipqaiqqKqoqaqqqKioqaipqKmpqKioqKqoqKkc5p6VAAABI0lEQVR42qWUjVbDIAyFr8VtqYo6YuD931Sh/KSpdMfjd3bWQG+TNCEFGHs8DkT8Ce1E8JBwFptBBS3m/BvSVIN4D1BHBWfssolf2LgSuWs26OYcPcqwObV2YsTh/a1sFQU629Lwruyn/W0pet9qz+pOWSn1Z/MvOHL/LbbULdt46amqnoy9CUQL2NRkyz7AJxg4S+orrCuRcf/Ra1r/qLP+kK+OMpMuUWFRcjLykZH0sJNkYA6PJyXRZgkdBGIiEMUxPrIdXJt65FSfiNRrkw6nJuHIhdrIhBw6ZPkWqO7btj7b5y+Qs7FbRk8SHNHZWEe24+ExgYeGhiHZR0td7Ll8abqliG3KehkZob+hoxs0upYcMCNEf9QH4FV9DLlYd/ybb9YCDv4mNKpOAAAAAElFTkSuQmCC",
  });

  const catchEntry = () => {
    if (caught || entry === undefined) return;

    if (name.toLowerCase() === entry.name.toLowerCase()) {
      textInput.current?.blur();
      setCaught(true);
      setGuess({ ...entry });
    }
  };

  const seeEntry = () => {
    if (caught || entry === undefined || guess.uri === entry.uri) return;

    setGuess({
      ...guess,
      uri: entry.uri,
    });
  };

  const onChangeText = (text: string) => {
    setName(text);
  };

  if (error) {
    return (
      <View style={[singleContainer]}>
        <ErrorMessage error={error} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={[singleContainer]}>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <View style={[pageContainer]}>
      {entry && (
        <>
          <Entry
            no={guess.no}
            name={guess.name}
            category={guess.category}
            height={entry.height}
            weight={entry.weight}
            description={entry.description}
            uri={guess.uri}
            seen={!caught && entry.uri === guess.uri}
          />

          <View style={[styles.guessContainer]}>
            <TextInput
              ref={textInput}
              onChangeText={onChangeText}
              style={[styles.guessInput]}
              spellCheck={false}
              maxLength={30}
            />
            <View style={[styles.actionsContainer]}>
              <Paddle angle={20} imageStyles={[styles.actionsImage]} />
              <View style={[styles.optionsContainer]}>
                <Pressable
                  onPress={catchEntry}
                  style={[
                    {
                      cursor: caught ? "auto" : "pointer",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      styles.catch,
                      caught && styles.inactive,
                    ]}
                  >
                    Catch
                  </Text>
                </Pressable>
                <Pressable
                  onPress={seeEntry}
                  style={[
                    {
                      cursor: guess.uri === entry.uri ? "auto" : "pointer",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      styles.see,
                      guess.uri === entry.uri && styles.inactive,
                    ]}
                  >
                    See
                  </Text>
                </Pressable>
              </View>
              <View
                style={[
                  {
                    transform: [
                      {
                        scaleX: -1,
                      },
                    ],
                  },
                ]}
              >
                <Paddle angle={20} imageStyles={[styles.actionsImage]} />
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Catch;

const styles = StyleSheet.create({
  guessContainer: {
    alignItems: "center",
    gap: 20,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  optionsContainer: {
    alignItems: "stretch",
    gap: 10,
  },
  guessInput: {
    minWidth: 140,
    paddingTop: 4,
    paddingBottom: 1,
    borderBottomColor: palette.color,
    borderBottomWidth: 1,
    textAlign: "center",
    fontSize: 24,
    fontFamily: "ComicNeue-Bold",
  },
  actionsImage: {
    width: 70,
    height: 35,
  },
  optionText: {
    textAlign: "center",
    textTransform: "uppercase",
    paddingHorizontal: 14,
    paddingVertical: 2,
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    letterSpacing: 1,
  },
  inactive: {
    ...palette.option.inactive,
  },
  catch: {
    ...palette.option.primary,
  },
  see: {
    ...palette.option.secondary,
  },
});
