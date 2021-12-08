import CommunicationController from "./CommunicationController";
import AsyncStorage from "@react-native-async-storage/async-storage";

export let appSetUp = async (appDataHandler) => {
  try {
    let sid = await AsyncStorage.getItem("sid");
    if (!sid)
      await new CommunicationController().register(async (response) => {
        sid = response;
        await AsyncStorage.setItem("sid", response);
      });

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
