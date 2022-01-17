import CommunicationController from "./CommunicationController";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

var cc = new CommunicationController();

export let handleEditProfileNamePress = async (userName, sid) => {
  if (userName && userName.length > 0) {
    if (userName.length < 20) {
      cc.setProfile({ sid: sid, name: userName })
        .then(() => {
          return true;
        })
        .catch((e) => {
          console.log(e);
          return false;
        });
    } else console.log("User entered a too long name");
  } else console.log("User entered an empty name");
};

export let handleEditProfilePicturePress = async () => {
  let permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();
  console.log(pickerResult);
};

export let initProfileData = async (sid) => {
  let uid = await AsyncStorage.getItem("uid");
  if (uid) {
    let pversion = await AsyncStorage.getItem("pversion");
    let name = await AsyncStorage.getItem("name");
    return { uid: uid, pversion: pversion, name: name };
  } else {
    let profileData = await cc.getProfile({ sid: sid });
    await AsyncStorage.setItem("uid", profileData["uid"]);
    await AsyncStorage.setItem("pversion", profileData["pversion"]);
    await AsyncStorage.setItem("name", profileData["name"]);
    return {
      uid: profileData["uid"],
      pversion: profileData["pversion"],
      name: profileData["name"],
    };
  }
};
