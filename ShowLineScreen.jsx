import React, { useEffect, useState, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Text, View, StyleSheet, Button } from "react-native";
import Posts from "./Posts";
import CommunicationController from "./controller/CommunicationController";
import { AppDataContext, DirectionContext } from "./AppContext";
import SpinningWheel from "./SpinningWheel";

export default function ShowLineScreen({ navigation }) {
  let isFocused = useIsFocused();
  let { sid, line } = useContext(AppDataContext);
  let handleBack = useContext(DirectionContext);
  let [posts, setPosts] = useState(null);
  let cc = new CommunicationController();

  useEffect(() => {
    cc.getPosts({ sid: sid, did: line.did })
      .then((result) => {
        let users = {};
        result.map((el) => {
          if (!users[el.author] && parseInt(el.pversion) > 0)
            users[el.author] = el.pversion;
        });
        Object.keys(users).map((el) =>
          cc
            .getUserPicture({ sid: sid, uid: el })
            .then((response) => {
              let updatedPosts = result.slice();
              updatedPosts.map((el, i) => {
                if (
                  el.author === response.uid &&
                  el.pversion === response.pversion
                ) {
                  updatedPosts[i].picture = response.picture.slice(0, 30);
                }
              });
              setPosts(updatedPosts);
            })
            .catch((error) => console.log(error))
        );
      })
      .catch((error) => console.log(error));

    return () => {
      console.log("UNMOUNTING SHOWLINE");
    };
  }, [sid, line.did, isFocused]);

  return (
    <View style={styles.flex1}>
      <Text>Hai selezionato la linea {line.lname}</Text>
      <Text>Lungo la tratta in direzione {line.sname}</Text>
      <Text>L’ID della bacheca è {line.did}</Text>
      <View style={styles.container}>
        <Button
          style={styles.flex1}
          title="BACK"
          onPress={() => {
            handleBack(null);
            navigation.navigate("Lines");
          }}
        />
        <Button
          style={styles.flex1}
          title="REVERT"
          onPress={() => {
            setPosts(null);
            handleBack({
              lname: line.lname,
              sname: line.reverseSname,
              did: line.reverseDid,
              reverseSname: line.sname,
              reverseDid: line.did,
            });
          }}
        />
        <Button
          style={styles.flex1}
          title="ADD POST"
          onPress={() => {
            navigation.navigate("Post");
          }}
        />
      </View>
      {posts ? <Posts data={posts} /> : <SpinningWheel />}
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
    marginBottom: 5,
  },
  flex1: { flex: 1 },
});
