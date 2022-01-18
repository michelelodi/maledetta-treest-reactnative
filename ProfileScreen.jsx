import React, { useContext, useEffect } from "react";
import { View, Button, StyleSheet, TextInput, Image } from "react-native";
import {
  AppDataContext,
  ProfileContext,
  UpdateProfileContext,
} from "./AppContext";
import SpinningWheel from "./SpinningWheel";
import {
  handleEditProfileNamePress,
  handleEditProfilePicturePress,
  initProfileData,
  getProfilePictureAsync,
} from "./controller/ProfileController";

export default function ProfileScreen() {
  let userName = null;
  let sid = useContext(AppDataContext)["sid"];
  let profileData = useContext(ProfileContext);
  let updateProfileContext = useContext(UpdateProfileContext);

  useEffect(() => {
    if (sid) {
      if (!profileData["uid"]) {
        initProfileData(sid)
          .then((response) => {
            updateProfileContext({
              name: response["name"],
              pversion: response["pversion"],
              uid: response["uid"],
              picture: require("./assets/missingProfilePicture.png"),
            });
          })
          .catch((error) => console.log(error));
      }
    }
  }, [sid]);

  useEffect(() => {
    if (
      profileData["uid"] &&
      parseInt(profileData["pversion"]) > 0 &&
      profileData["picture"] != "./assets/missingProfilePicture.png"
    )
      getProfilePictureAsync(profileData["uid"])
        .then((response) =>
          updateProfileContext({ ...profileData, picture: response })
        )
        .catch((error) => console.log(error));
  }, [profileData["uid"]]);

  return profileData ? (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.flex1}
          placeholder={profileData["name"]}
          onChangeText={(userNameText) => {
            userName = userNameText;
          }}
        ></TextInput>
        <Button
          title={"Modifica"}
          onPress={() => {
            handleEditProfileNamePress(userName, sid, () => {})
              .then((_) => {
                updateProfileContext({ ...profileData, name: userName });
              })
              .catch((error) => console.log(error));
          }}
          style={styles.flex2}
        />
      </View>
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={profileData["picture"]}
        />
        <Button
          title={"Modifica"}
          onPress={() => {
            handleEditProfilePicturePress(profileData.uid, profileData.pversion)
              .then((response) => {
                updateProfileData({
                  ...profileData,
                  pversion: parseInt(profileData["pversion"]) + 1 + "",
                  picture: response,
                });
              })
              .catch((error) => console.log(error));
          }}
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
