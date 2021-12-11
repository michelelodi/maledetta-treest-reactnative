import React, { useState, useContext } from "react";
import { FlatList, View, Text, Image, Button } from "react-native";
import base64 from "react-native-base64";
import { AppDataContext } from "./AppContext";
import CommunicationController from "./controller/CommunicationController";

export default function Posts({ data }) {
  let { sid, _ } = useContext(AppDataContext);
  let cc = new CommunicationController();
  let [follow, setFollow] = useState(initFollow());

  let following = [];
  let notFollowing = [];
  data.forEach((el) => {
    el["followingAuthor"] ? following.push(el) : notFollowing.push(el);
  });
  data = following.concat(notFollowing);

  function initFollow() {
    return Object.fromEntries(
      data.map((el) => {
        return [el["author"], el["followingAuthor"]];
      })
    );
  }

  function revertFollow(item) {
    if (follow[item["author"]]) {
      cc.unfollow({ sid: sid, uid: item["author"] })
        .then(() => {
          let revertFollow = { ...follow };
          revertFollow[item["author"]] = !revertFollow[item["author"]];
          setFollow(revertFollow);
        })
        .catch((e) => console.log(e));
    } else {
      cc.follow({ sid: sid, uid: item["author"] })
        .then(() => {
          let revertFollow = { ...follow };
          revertFollow[item["author"]] = !revertFollow[item["author"]];
          setFollow(revertFollow);
        })
        .catch((e) => console.log(e));
    }
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <View style={{ borderWidth: 1, padding: 5 }}>
            {Object.keys(item).map((k, i) => {
              if (k != "upicture")
                return (
                  <Text key={i}>
                    {k}: {item[k] + ""}
                  </Text>
                );
              else if (item[k].length > 4 && item[k].length % 4 === 0) {
                try {
                  let base64Icon = item[k].replace(/\n/g, "");
                  base64.decode(base64Icon);
                  return (
                    <View key={Date.now() + "" + i + Math.random()}>
                      <Image
                        key={i}
                        style={{
                          width: 50,
                          height: 50,
                          marginBottom: 5,
                        }}
                        source={{ uri: "data:image/png;base64," + base64Icon }}
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
                        source={require("./missingProfilePicture.png")}
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
              } else
                return (
                  <View key={Date.now() + "" + i + Math.random()}>
                    <Image
                      key={i}
                      style={{
                        width: 50,
                        height: 50,
                        marginBottom: 5,
                      }}
                      source={require("./missingProfilePicture.png")}
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
            })}
          </View>
        );
      }}
      keyExtractor={(_, i) => i}
    />
  );
}
