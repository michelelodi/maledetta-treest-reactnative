import CommunicationController from "./CommunicationController";
import * as ImagePicker from "expo-image-picker";

export let handleEditProfileNamePress = async (userName, sid) => {
  if (userName && userName.length > 0) {
    if (userName.length < 20) {
      let cc = new CommunicationController();
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
  console.log("pippo");
  let permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();
  console.log(pickerResult);
};
