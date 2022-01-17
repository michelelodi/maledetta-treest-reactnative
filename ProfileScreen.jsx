import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Image } from "react-native";
import { AppDataContext } from "./AppContext";
import CommunicationController from "./controller/CommunicationController";
import SpinningWheel from "./SpinningWheel";
import {
  handleEditProfileNamePress,
  handleEditProfilePicturePress,
} from "./controller/ProfileController";

export default function ProfileScreen() {
  let [user, setUser] = useState(null);
  let userName = null;
  let sid = useContext(AppDataContext)["sid"];

  useEffect(() => {
    if (sid) {
      let cc = new CommunicationController();
      cc.getProfile({ sid: sid })
        .then((response) => setUser(response))
        .catch((error) => console.log(error));
    }
  }, [sid]);

  return user ? (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.flex1}
          placeholder={user["name"]}
          onChangeText={(userNameText) => {
            userName = userNameText;
          }}
        ></TextInput>
        <Button
          title={"Modifica"}
          onPress={() => {
            handleEditProfileNamePress(userName, sid, () => {
              setUser({ ...user, name: userName });
            });
          }}
          style={styles.flex2}
        />
      </View>
      <View style={styles.container}>
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={require("./assets/missingProfilePicture.png")}
        />
        <Text style={styles.flex1}>picture:{user["picture"] + ""}</Text>
        <Button
          title={"Modifica"}
          onPress={() => {
            handleEditProfilePicturePress();
          }}
          style={styles.flex1}
        />
      </View>
    </View>
  ) : (
    <SpinningWheel />
  );
}

let styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
});
