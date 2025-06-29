import { getEntryByCatchCounter } from "@/api/queries";
import Entry from "@/components/Entry";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Colors } from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useRef, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
const imagePaddle = require("@/assets/images/catch-paddle.png");

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
  const [reveal, setReveal] = useState<boolean>(false);
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
    if (entry === undefined) return;

    const name = textInput.current?.value;
    if (name.toLowerCase() === entry.name.toLowerCase()) {
      setReveal(true);
      setGuess(entry);
    }
  };
  const peekEntry = () => {
    if (entry === undefined) return;

    setGuess({
      ...guess,
      uri: entry.uri,
    });
  };

  if (error) {
    return (
      <View
        style={{
          marginTop: 16,
          alignSelf: "center",
        }}
      >
        <ErrorMessage error={error} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View
        style={{
          marginTop: 16,
          alignSelf: "center",
        }}
      >
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <View
      style={{
        maxWidth: 500,
        width: "100%",
        marginInline: "auto",
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 24,
      }}
    >
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
            imageStyles={{
              filter: [{ grayscale: 1 }, { brightness: 0.15 }],
            }}
          />

          <View style={[styles.guessContainer]}>
            <TextInput ref={textInput} style={[styles.guessInput]} />
            <View style={[styles.actionsContainer]}>
              <Image
                style={[
                  styles.actionsImage,
                  {
                    transform: [
                      {
                        rotateZ: "20deg",
                      },
                    ],
                  },
                ]}
                source={imagePaddle}
              />
              <View style={[styles.optionsContainer]}>
                <Pressable
                  onPress={catchEntry}
                  style={[
                    styles.optionButton,
                    {
                      cursor: guess.name === entry.name ? "auto" : "pointer",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      styles.catch,
                      guess.name === entry.name && styles.inactive,
                    ]}
                  >
                    Catch
                  </Text>
                </Pressable>
                <Pressable
                  onPress={peekEntry}
                  style={[
                    styles.optionButton,
                    {
                      cursor: reveal ? "auto" : "pointer",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      styles.see,
                      reveal && styles.inactive,
                    ]}
                  >
                    Peek
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
                <Image
                  style={[
                    styles.actionsImage,
                    {
                      transform: [
                        {
                          rotateZ: "20deg",
                        },
                      ],
                    },
                  ]}
                  source={imagePaddle}
                />
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
    paddingTop: 4,
    paddingBottom: 1,
    borderBottomColor: Colors.color,
    borderBottomWidth: 1,
    textAlign: "center",
    fontSize: 24,
    fontFamily: "ComicNeue-Bold",
  },
  actionsImage: {
    width: 70,
    height: 35,
  },
  optionButton: {
    display: "flex",
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
    ...Colors.option.inactive,
  },
  catch: {
    ...Colors.option.catch,
  },
  see: {
    ...Colors.option.see,
  },
});
