import Ribbon from "@/components/Ribbon";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import Svg, { Image as SvgImage } from "react-native-svg";

import { WebView } from "react-native-webview";

const Entry = () => {
  const db = useSQLiteContext();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [entry, setEntry] = useState<Entry>();

  const imageScale = 3;
  const imageWidth = 46 * imageScale;
  const imageHeight = 30 * imageScale;

  useEffect(() => {
    db.getFirstAsync<EntryDB>("SELECT * FROM entry WHERE name = ?", [
      name,
    ]).then((entryDB) => {
      if (entryDB) {
        const { name, no, description, weight, height, img } = entryDB;
        const base64Data = btoa(String.fromCharCode.apply(null, img));
        const uri = "data:image/png;base64," + base64Data;

        setEntry({
          name,
          no,
          description,
          weight,
          height,
          uri,
        });
      }
    });

    return () => {};
  }, []);

  return (
    <>
      <Ribbon />
      <View
        style={{
          flex: 1,
          maxWidth: 500,
          width: "100%",
          marginInline: "auto",
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
      >
        {entry ? (
          <>
            <Text>{entry.name}</Text>
            <Text>{entry.description}</Text>
            <Text>W {entry.weight}</Text>
            <Text>H {entry.height}</Text>
            {Platform.OS === "web" ? (
              <Svg
                width={imageWidth}
                height={imageHeight}
                image-rendering="pixelated"
              >
                <SvgImage
                  width={imageWidth}
                  height={imageHeight}
                  href={{ uri: entry.uri }}
                />
              </Svg>
            ) : (
              <View
                style={{
                  width: imageWidth,
                  height: imageHeight,
                }}
              >
                <WebView
                  domStorageEnabled={false}
                  javaScriptEnabled={false}
                  scalesPageToFit={false}
                  style={{
                    backgroundColor: "transparent",
                  }}
                  originWhitelist={["*"]}
                  source={{
                    html: `<body style="margin: 0;">
                    <img 
                      alt=""
                      src="${entry.uri}" 
                      style="
                        display: block;
                        width: ${imageWidth}px;
                        height: ${imageHeight}px;
                        image-rendering: pixelated;
                        image-rendering: -moz-crisp-edges;
                        image-rendering: crisp-edges;
                      "
                    />
                  </body>`,
                  }}
                />
              </View>
            )}
          </>
        ) : (
          <>
            <Text>{name} not found</Text>
          </>
        )}
      </View>
      <Ribbon />
    </>
  );
};

export default Entry;
