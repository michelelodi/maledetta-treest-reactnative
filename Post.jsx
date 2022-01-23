import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import SecondaryButton from "./view/SecondaryButton";
import { fontStyles } from "./TreEstStyles";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

export default function Post({ item, follow, revertFollow }) {
  let [upicture, setUpicture] = useState(
    require("./assets/missingProfilePicture.png")
  );
  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  });

  let [delay, setDelay] = useState(null);
  let [status, setStatus] = useState(null);

  useEffect(() => {
    if (item["upicture"].length > 4) {
      if (item["upicture"].startsWith("data:image/png;base64,"))
        setUpicture({ uri: item["upicture"] });
      else setUpicture({ uri: "data:image/png;base64," + item["upicture"] });
    }

    if (item["delay"] != null) {
      switch (item["delay"]) {
        case 0:
          setDelay({ icon: require("./assets/no_delay.png"), text: "on time" });
          break;
        case 1:
          setDelay({
            icon: require("./assets/shortDelay.png"),
            text: "<15 minutes",
          });
          break;
        case 2:
          setDelay({
            icon: require("./assets/longDelay.png"),
            text: "15+ minutes",
          });
          break;
        case 3:
          setDelay({
            icon: require("./assets/cancelled.png"),
            text: "cancelled",
          });
          break;
        default:
          setDelay(null);
          break;
      }
    }

    if (item["status"] != null) {
      switch (item["status"]) {
        case 0:
          setStatus({ icon: require("./assets/ideal.png"), text: "Ideal" });
          break;
        case 1:
          setStatus({
            icon: require("./assets/meh.png"),
            text: "Acceptable",
          });
          break;
        case 2:
          setStatus({
            icon: require("./assets/frown.png"),
            text: "Serious problems",
          });
          break;
        default:
          setStatus(null);
          break;
      }
    }
  }, []);

  return fontsLoaded ? (
    <View
      style={{
        borderRadius: 2,
        elevation: 2,
        padding: 16,
        marginBottom: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        {
          <Image
            onError={() => {
              setUpicture(require("./assets/missingProfilePicture.png"));
            }}
            style={{
              width: 50,
              height: 50,
              marginBottom: 8,
              borderRadius: 8,
              marginRight: 16,
            }}
            source={upicture}
          />
        }
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text
            style={{
              ...fontStyles.authorName,
              color: follow[item["author"]] ? "#04C4D9" : "#F2C641",
              flex: 1,
            }}
          >
            @{item["authorName"] != "unnamed" ? item["authorName"] : "guest"}
          </Text>
          <Text style={{ flex: 1, ...fontStyles.postDate }}>
            {item["datetime"].substr(0, 10)}
          </Text>
          <Text style={{ flex: 1, ...fontStyles.postDate }}>
            {item["datetime"].substr(11, 5)}
          </Text>
        </View>
        <SecondaryButton
          style={{ flex: 1 }}
          title={follow[item["author"]] ? "UNFOLLOW" : "FOLLOW"}
          iconName={"plus-circle"}
          onPress={() => {
            revertFollow(item);
          }}
        />
      </View>
      {delay || status ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {delay ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 4,
                }}
                source={delay["icon"]}
              />
              <Text style={{ ...fontStyles.textInputLabel, marginRight: 8 }}>
                {delay["text"]}
              </Text>
            </View>
          ) : null}
          {status ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 4,
                }}
                source={status["icon"]}
              />
              <Text style={fontStyles.textInputLabel}>{status["text"]}</Text>
            </View>
          ) : null}
        </View>
      ) : null}
      {item["comment"] ? (
        <View style={{ borderRadius: 2, padding: 8, marginTop: 16 }}>
          <Text style={fontStyles.comment}>{item["comment"]}</Text>
        </View>
      ) : null}
    </View>
  ) : null;
}
