import React, { useEffect, useState, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Text, View, StyleSheet, Button } from "react-native";
import Posts from "./Posts";
import ShowLineController from "./controller/ShowLineController";
import {
  AppDataContext,
  DirectionContext,
  StationsContext,
  UpdateStationsContext,
} from "./AppContext";
import SpinningWheel from "./SpinningWheel";

export default function ShowLineScreen({ navigation }) {
  let isFocused = useIsFocused();
  let { sid, line } = useContext(AppDataContext);
  let [posts, setPosts] = useState(null);
  let revertDirection = useContext(DirectionContext);
  let stations = useContext(StationsContext);
  let updateStations = useContext(UpdateStationsContext);
  let sc = new ShowLineController();

  useEffect(() => {
    if (isFocused)
      sc.setUpPosts({ sid: sid, did: line.did })
        .then((result) => setPosts(result))
        .catch((error) => console.log(error));

    return () => {
      console.log("UNMOUNTING SHOWLINE");
    };
  }, [sid, line.did, isFocused]);

  return (
    <View style={styles.flex1}>
      <Text>Hai selezionato la linea {line.lname}</Text>
      <Text>Lungo la tratta in direzione {line.sname}</Text>
      <View style={styles.container}>
        <Button
          style={styles.flex1}
          title="REVERT"
          onPress={() => {
            setPosts(null);
            revertDirection({
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
        <Button
          style={styles.flex1}
          title="SHOW MAP"
          onPress={() => {
            sc.handleStationsToShow({ sid: sid, did: line.did }, stations)
              .then((response) => {
                if (response) updateStations(response);
                navigation.navigate("Map");
              })
              .catch((error) => console.log(error));
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
