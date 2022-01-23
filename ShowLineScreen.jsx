import React, { useEffect, useState, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Posts from "./Posts";
import { Ionicons } from "@expo/vector-icons";
import ShowLineController from "./controller/ShowLineController";
import {
  AppDataContext,
  DirectionContext,
  StationsContext,
  UpdateStationsContext,
} from "./AppContext";
import SpinningWheel from "./SpinningWheel";
import { fontStyles } from "./TreEstStyles";
import SecondaryButton from "./view/SecondaryButton";
import { useFonts, Roboto_700Bold } from "@expo-google-fonts/roboto";

export default function ShowLineScreen({ navigation }) {
  let isFocused = useIsFocused();
  let { sid, line } = useContext(AppDataContext);
  let [posts, setPosts] = useState(null);
  let revertDirection = useContext(DirectionContext);
  let stations = useContext(StationsContext);
  let updateStations = useContext(UpdateStationsContext);
  let sc = new ShowLineController();
  let [revertButtonState, pressRevertButton] = useState(false);
  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
  });

  useEffect(() => {
    if (isFocused)
      sc.setUpPosts({ sid: sid, did: line.did })
        .then((result) => setPosts(result))
        .catch((error) => console.log(error));

    return () => {
      console.log("UNMOUNTING SHOWLINE");
    };
  }, [sid, line.did, isFocused]);

  return fontsLoaded ? (
    <View
      style={{
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 160,
      }}
    >
      <View
        style={{
          borderRadius: 4,
          elevation: 2,
          padding: 16,
          marginBottom: 24,
          shadowColor: "#F2C641",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View style={styles.flex2}>
            <Text style={fontStyles.littleBlueTitle}>{"Departure"}</Text>
            <Text style={fontStyles.lineTitle}>
              {line.reverseSname.substr(0, line.reverseSname.indexOf(" ")) +
                "\n" +
                line.reverseSname.substr(line.reverseSname.indexOf(" ") + 1)}
            </Text>
          </View>
          <View style={{ ...styles.flex1_image }}>
            <Pressable
              onPressIn={() => {
                pressRevertButton(true);
              }}
              onPressOut={() => {
                pressRevertButton(false);
              }}
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
              style={({ pressed }) => [
                {
                  borderColor: pressed ? "#BDEDF2" : "#04C4D9",
                  borderWidth: 1,
                  borderRadius: 2,
                },
              ]}
            >
              <Ionicons
                name="md-swap-horizontal"
                size={24}
                color={revertButtonState ? "#BDEDF2" : "#04C4D9"}
              />
            </Pressable>
          </View>
          <View style={styles.flex2}>
            <Text style={{ ...fontStyles.littleBlueTitle, textAlign: "right" }}>
              {"Arrival"}
            </Text>
            <Text
              style={{
                ...fontStyles.lineTitle,
                textAlign: "right",
              }}
            >
              {line.sname.substr(0, line.sname.indexOf(" ")) +
                "\n" +
                line.sname.substr(line.sname.indexOf(" ") + 1)}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <SecondaryButton
            style={{ flex: 1 }}
            title={"report"}
            iconName={"plus-circle"}
            onPress={() => navigation.navigate("Post")}
          />
          <SecondaryButton
            style={{ flex: 1 }}
            title={"show map"}
            iconName={"map-pin"}
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
      </View>

      {posts ? <Posts data={posts} /> : <SpinningWheel />}
    </View>
  ) : (
    <SpinningWheel />
  );
}

let styles = StyleSheet.create({
  flex2: {
    flex: 2,
    flexDirection: "column",
  },
  flex1_image: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
