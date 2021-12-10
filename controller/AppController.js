import CommunicationController from "./CommunicationController";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageManager from "../model/StorageManager";

export let appSetUp = async (appDataHandler) => {
  let sm = new StorageManager();

  // db.storeUserPicture("martina", "0", "null")
  //   .then((result) => {
  //     db.getAllUsers()
  //       .then((result) => console.log(JSON.stringify(result)))
  //       .catch((error) => console.log(error));
  //   })
  //   .catch((error) => console.log(error));

  // db.getAllUsers()
  //   .then((result) => console.log(JSON.stringify(result)))
  //   .catch((error) => console.log(error));

  // db.getUserPicture("martina")
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log(error));

  try {
    let sid = await AsyncStorage.getItem("sid");
    if (!sid)
      await new CommunicationController()
        .register()
        .then(async (response) => {
          sid = response;
          await AsyncStorage.setItem("sid", response);
        })
        .catch((error) => console.log(error));

    let line = await AsyncStorage.getItem("selectedLine");
    appDataHandler({ sid: sid, line: line });
  } catch (e) {
    console.log(e);
  }
};

export let saveCurrentLine = async (line) => {
  try {
    console.log("Saving current line");
    await AsyncStorage.setItem("selectedLine", JSON.stringify(line));
  } catch (e) {
    console.log(e);
  }
};
