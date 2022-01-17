import React from "react";
import { View, Text, Image, Button } from "react-native";

export default function Post({ item, follow, revertFollow }) {
  return (
    <View style={{ borderWidth: 1, padding: 5 }}>
      {Object.keys(item).map((k, i) => {
        if (k != "upicture")
          return (
            <Text key={i}>
              {k}: {item[k] + ""}
            </Text>
          );
        else if (item[k].length > 4) {
          try {
            if (item[k].startsWith("data:image/png;base64,"))
              item[k] = item[k].substring(22);
            return (
              <View key={Date.now() + "" + i + Math.random()}>
                <Image
                  key={i}
                  style={{
                    width: 50,
                    height: 50,
                    marginBottom: 5,
                  }}
                  source={{ uri: "data:image/png;base64," + item[k] }}
                />
                <Button
                  key={Date.now() + "" + i + Math.random()}
                  title={follow[item["author"]] ? "UNFOLLOW" : "FOLLOW"}
                  onPress={() => {
                    revertFollow(item);
                  }}
                />
              </View>
            );
          } catch (e) {
            console.log(e);
            return (
              <View key={Date.now() + "" + i + Math.random()}>
                <Image
                  key={i}
                  style={{
                    width: 50,
                    height: 50,
                    marginBottom: 5,
                  }}
                  source={require("./assets/missingProfilePicture.png")}
                />
                <Button
                  key={Date.now() + "" + i + Math.random()}
                  title={follow[item["author"]] ? "UNFOLLOW" : "FOLLOW"}
                  onPress={() => {
                    revertFollow(item);
                  }}
                />
              </View>
            );
          }
        } else {
          return (
            <View key={Date.now() + "" + i + Math.random()}>
              <Image
                key={i}
                style={{
                  width: 50,
                  height: 50,
                  marginBottom: 5,
                }}
                source={require("./assets/missingProfilePicture.png")}
              />
              <Button
                key={Date.now() + "" + i + Math.random()}
                title={follow[item["author"]] ? "UNFOLLOW" : "FOLLOW"}
                onPress={() => {
                  revertFollow(item);
                }}
              />
            </View>
          );
        }
      })}
    </View>
  );
}
