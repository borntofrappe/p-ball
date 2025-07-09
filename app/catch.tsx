import { getRandomSearchEntry } from "@/api/queries";
import Background from "@/components/Background";
import CatchPaddle from "@/components/CatchPaddle";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import PixelatedImage from "@/components/PixelatedImage";
import { pageContainer, palette, singleContainer } from "@/lib/styles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

const Catch = () => {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  const imageScale = 3;
  const imageWidth = 46 * imageScale;
  const imageHeight = 30 * imageScale;

  const textInput = useRef<TextInput>(null);
  const [caught, setCaught] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  let {
    data: seachEntry,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["catch"],
    queryFn: () => getRandomSearchEntry({ db, excludeName: name }),
  });

  const guessName = () => {
    if (caught || seachEntry === undefined) return;

    if (name.toLowerCase() === seachEntry.name.toLowerCase()) {
      textInput.current?.blur();
      setCaught(true);
    } else {
      textInput.current?.focus();
    }
  };

  const nextName = async () => {
    if (seachEntry === undefined) return;

    await queryClient.invalidateQueries({ queryKey: ["catch"] });

    if (caught) {
      setCaught(false);
    }

    if (name !== "") {
      setName("");
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
        {seachEntry && (
          <>
            <View
              style={[
                styles.catchContainer,
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
                    uri={seachEntry.uri}
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
          </>
        )}
      </View>
    </>
  );
};

export default Catch;

const styles = StyleSheet.create({
  catchContainer: {
    alignItems: "stretch",
  },
  catchImageContainer: {
    borderColor: palette.form.color,
    borderWidth: 2,
    backgroundColor: palette.form.backgroundColor,
  },
  catchText: {
    textAlign: "center",
    textTransform: "uppercase",
    paddingHorizontal: 6,
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    letterSpacing: 1,
    ...palette.option.primary,
  },
  guessContainer: {
    marginTop: 20,
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
    paddingVertical: 2,
    fontSize: 24,
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
