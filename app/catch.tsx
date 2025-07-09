import { getEntriesData } from "@/api/queries";
import Background from "@/components/Background";
import CatchPaddle from "@/components/CatchPaddle";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import PixelatedImage from "@/components/PixelatedImage";
import { pageContainer, palette, singleContainer } from "@/lib/styles";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const Catch = () => {
  const db = useSQLiteContext();

  const {
    data: entries,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["catch", { db }],
    queryFn: async () => getEntriesData({ db }),
  });

  const textInput = useRef<TextInput>(null);
  const [caught, setCaught] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [entry, setEntry] = useState<EntryLookup>();
  const [record, setRecord] = useState<Record<string, number>>({});
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (entries && !hasInitialized) {
      setEntry(entries[Math.floor(Math.random() * entries.length)]);
      setRecord(
        entries.reduce((acc, curr) => {
          acc[curr.name] = 0;
          return acc;
        }, {} as Record<string, number>)
      );
      setHasInitialized(true);
    }
  }, [entries]);

  const imageScale = 3;
  const imageWidth = 46 * imageScale;
  const imageHeight = 30 * imageScale;

  const guessName = () => {
    if (caught || entries === undefined || entry === undefined) return;

    if (name.toLowerCase().trim() === entry.name.toLowerCase()) {
      const name = entry.name;

      setCaught(true);
      setRecord((prevRecord) => {
        const newRecord = { ...prevRecord };
        newRecord[name] += 1;
        return newRecord;
      });

      textInput.current?.blur();
    } else {
      textInput.current?.focus();
    }
  };

  const nextName = async () => {
    if (entries === undefined || entry === undefined) return;

    const { name: previousName } = entry;
    let newName: string | undefined;

    const weights = [];
    let totalWeight = 0;
    let frequencyPairs = Object.entries(record);
    const randomFrequencyPairs: [string, number][] = [];

    while (frequencyPairs.length > 0) {
      const i = Math.floor(Math.random() * frequencyPairs.length);
      randomFrequencyPairs.push(frequencyPairs.splice(i, 1)[0]);
    }

    const sortedFrequencyPairs = randomFrequencyPairs.sort(
      (a, b) => a[1] - b[1]
    );

    for (const [, value] of sortedFrequencyPairs) {
      const weight = 1 / (value + 1);
      weights.push(weight);
      totalWeight += weight;
    }

    while (newName === undefined) {
      let randomWeight = Math.random() * totalWeight;

      for (let i = 0; i < sortedFrequencyPairs.length; i++) {
        randomWeight -= weights[i];
        const name = sortedFrequencyPairs[i][0];
        if (randomWeight <= 0 && name !== previousName) {
          newName = name;
          break;
        }
      }
    }

    const newEntry = entries.find((d) => d.name === newName);
    setEntry(newEntry || entries[99]);
    setName("");
    if (caught) {
      setCaught(false);
    }

    textInput.current?.focus();
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
    <>
      <Background />
      <View style={[pageContainer]}>
        {entry && (
          <View style={[styles.entryContainer]}>
            <View
              style={[
                {
                  width: imageWidth,
                  marginInline: "auto",
                },
              ]}
            >
              <View style={[styles.catchImageContainer]}>
                <View
                  style={[
                    !caught && {
                      filter: "grayscale(1) brightness(0)",
                    },
                  ]}
                >
                  <PixelatedImage
                    width={imageWidth}
                    height={imageHeight}
                    uri={entry.uri}
                  />
                </View>
              </View>
              <Text style={[styles.catchText]}>Catch</Text>
            </View>

            <View style={[styles.guessContainer]}>
              <TextInput
                value={name}
                ref={textInput}
                onChangeText={onChangeText}
                style={[styles.guessInput]}
                spellCheck={false}
                maxLength={30}
                onSubmitEditing={guessName}
              />
              <View style={[styles.actionsContainer]}>
                <CatchPaddle angle={20} imageStyles={[styles.actionsImage]} />
                <View style={[styles.optionsContainer]}>
                  <Pressable
                    onPress={guessName}
                    style={[
                      {
                        cursor: caught ? "auto" : "pointer",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        styles.guess,
                        caught && styles.inactive,
                      ]}
                    >
                      Guess
                    </Text>
                  </Pressable>
                  <Pressable onPress={nextName}>
                    <Text style={[styles.optionText, styles.next]}>Next</Text>
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
                  <CatchPaddle angle={20} imageStyles={[styles.actionsImage]} />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default Catch;

const styles = StyleSheet.create({
  entryContainer: {
    paddingVertical: 16,
    gap: 16,
  },
  catchImageContainer: {
    borderColor: palette.form.color,
    borderWidth: 2,
    backgroundColor: palette.form.backgroundColor,
  },
  catchText: {
    lineHeight: 30,
    fontSize: 30,
    paddingTop: 2,
    paddingBottom: 3,
    letterSpacing: 1,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Poppins-Bold",
    ...palette.option.primary,
  },
  guessContainer: {
    alignItems: "center",
    gap: 30,
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
    color: palette.input.color,
    borderBottomColor: palette.input.color,
    borderBottomWidth: 1,
    textAlign: "center",
    fontSize: 28,
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
    paddingVertical: 8,
    fontSize: 26,
    lineHeight: 26,
    fontFamily: "Poppins-Bold",
    letterSpacing: 1,
  },
  inactive: {
    ...palette.option.inactive,
  },
  guess: {
    ...palette.option.primary,
  },
  next: {
    ...palette.option.secondary,
  },
});
