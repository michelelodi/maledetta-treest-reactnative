import CommunicationController from "./CommunicationController";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import StorageManager from "../model/StorageManager";

var cc = new CommunicationController();
var sm = new StorageManager();

export let handleEditProfileNamePress = async (userName, sid) => {
  if (userName && userName.length > 0) {
    if (userName.length < 20) {
      await cc.setProfile({ sid: sid, name: userName });
      await AsyncStorage.setItem("name", userName);
      return;
    } else console.log("User entered a too long name");
  } else console.log("User entered an empty name");
};

export let handleEditProfilePicturePress = async (uid, pversion) => {
  let permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let picture = await ImagePicker.launchImageLibraryAsync();
  let base64 = await FileSystem.readAsStringAsync(picture.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  await cc.setProfile({ sid: sid, picture: base64 });
  await sm.storeUserPicture(uid, parseInt(pversion) + 1 + "", base64);
  await AsyncStorage.setItem("pversion", parseInt(pversion) + 1 + "");
  return {
    uri: "data:image/png;base64," + base64,
  };
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

export let getProfilePictureAsync = async (uid) => {
  let picture = await sm.getUserPicture(uid);
  return { uri: "data:image/png;base64," + picture["picture"] };
};
