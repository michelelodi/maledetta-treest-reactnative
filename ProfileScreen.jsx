import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import { fontStyles } from "./TreEstStyles";
import {
  AppDataContext,
  ProfileContext,
  UpdateProfileContext,
} from "./AppContext";
import SpinningWheel from "./SpinningWheel";
import PrimaryButton from "./view/PrimaryButton";
import SecondaryButton from "./view/SecondaryButton";
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
  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  });

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

  return profileData && fontsLoaded ? (
    <View style={{ padding: 24 }}>
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            width: 116,
            height: 116,
            borderRadius: 8,
          }}
          source={profileData["picture"]}
        />
        <SecondaryButton
          title={"Edit"}
          onPress={() => {
            handleEditProfilePicturePress(
              profileData.uid,
              profileData.pversion,
              sid
            )
              .then((response) => {
                updateProfileData({
                  ...profileData,
                  pversion: parseInt(profileData["pversion"]) + 1 + "",
                  picture: response,
                });
              })
              .catch((error) => console.log(error));
          }}
          iconName={"camera"}
        />
      </View>
      <View style={{ marginTop: 24, alignItems: "center" }}>
        <View
          style={{
            padding: 30,
            borderRadius: 2,
            elevation: 5,
            shadowColor: "#F2C641",
            marginBottom: 56,
          }}
        >
          <Text style={{ marginBottom: 4, ...fontStyles.textInputLabel }}>
            {"Username"}
          </Text>
          <TextInput
            placeholder={profileData["name"]}
            placeholderTextColor={"black"}
            onChangeText={(userNameText) => {
              userName = userNameText;
            }}
            style={{
              borderBottomColor: "#04C4D9",
              borderBottomWidth: 2,
              padding: 10,
              backgroundColor: "#EEFAFC",
              borderRadius: 4,
            }}
          ></TextInput>
          <Text style={{ marginTop: 4, ...fontStyles.textInputDescription }}>
            {
              "Choose a username 6-20 characters long. Your username can be any combination of letters, numbers, or symbols."
            }
          </Text>
        </View>
        <PrimaryButton
          title={"SAVE"}
          onPress={() => {
            handleEditProfileNamePress(userName, sid, () => {})
              .then((_) => {
                updateProfileContext({ ...profileData, name: userName });
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
