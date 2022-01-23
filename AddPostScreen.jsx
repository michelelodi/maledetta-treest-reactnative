import React, { useContext, useState } from "react";
import CommunicationController from "./controller/CommunicationController";
import { AppDataContext } from "./AppContext";
import { TextInput, View, Text, Image } from "react-native";
import PrimaryButton from "./view/PrimaryButton";
import { fontStyles } from "./TreEstStyles";
import RadioButton from "./view/RadioButton";

export default function AddPostScreen({ navigation }) {
  let { sid, line } = useContext(AppDataContext);
  let [delay, setDelay] = useState(null);
  let [status, setStatus] = useState(null);
  let [comment, setComment] = useState(null);

  let [radioButtonsState, setRadioButtonsState] = useState({
    zero: false,
    one: false,
    two: false,
    three: false,
  });

  let [statusButtonsState, setStatusButtonsState] = useState({
    zero: false,
    one: false,
    two: false,
  });

  function radioButtonPress(index) {
    let updatedButtons = { zero: false, one: false, two: false, three: false };
    updatedButtons[index] = !radioButtonsState[index];
    setRadioButtonsState(updatedButtons);
  }

  function statusButtonPress(index) {
    let updatedButtons = { zero: false, one: false, two: false };
    updatedButtons[index] = !statusButtonsState[index];
    setStatusButtonsState(updatedButtons);
  }

  let data = {
    sid: sid,
    did: line.did,
    delay: delay,
    status: status,
    comment: comment,
  };

  function postIsValid() {
    return delay != null || status != null || comment != null;
  }

  return (
    <View style={{ padding: 24 }}>
      <Text style={fontStyles.title}>{"Rate the line:"}</Text>
      {/* comment component */}
      <View
        style={{ marginBottom: 16, padding: 8, elevation: 1, borderRadius: 2 }}
      >
        <Text style={{ ...fontStyles.lineTitle, marginBottom: 16 }}>
          {"Comment:"}
        </Text>
        <TextInput
          style={{
            borderBottomColor: "#04C4D9",
            borderBottomWidth: 2,
            padding: 4,
            backgroundColor: "#EEFAFC",
            borderRadius: 4,
          }}
          maxLength={99}
          onChangeText={(value) =>
            value.length > 0 ? setComment(value) : setComment(null)
          }
        ></TextInput>
      </View>
      {/* delay component */}
      <View style={{ padding: 8, elevation: 1, borderRadius: 2 }}>
        <Text style={{ ...fontStyles.lineTitle, marginBottom: 16 }}>
          {"How much delay does your train \nhave?:"}
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              onButtonPressed={() => {
                radioButtonPress("zero");
                delay === "zero" ? setDelay(null) : setDelay(0);
              }}
              pressed={radioButtonsState["zero"]}
            ></RadioButton>
            <Image
              style={{ width: 24, height: 24, marginLeft: 12, marginRight: 4 }}
              source={require("./assets/no_delay.png")}
            />
            <Text style={fontStyles.textInputLabel}>{"on time"}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              onButtonPressed={() => {
                radioButtonPress("two");
                delay === "two" ? setDelay(null) : setDelay(2);
              }}
              pressed={radioButtonsState["two"]}
            ></RadioButton>
            <Image
              style={{
                width: 24,
                height: 24,
                marginLeft: 12,
                marginRight: 4,
                transform: [{ rotate: "45deg" }],
              }}
              source={require("./assets/longDelay.png")}
            />
            <Text style={fontStyles.textInputLabel}>{"15+ minutes"}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <RadioButton
              onButtonPressed={() => {
                radioButtonPress("one");
                delay === "one" ? setDelay(null) : setDelay(1);
              }}
              pressed={radioButtonsState["one"]}
            ></RadioButton>
            <Image
              style={{
                width: 32,
                height: 32,
                marginLeft: 8,
                transform: [{ rotate: "45deg" }],
              }}
              source={require("./assets/shortDelay.png")}
            />
            <Text style={fontStyles.textInputLabel}>{"<15 minutes"}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              onButtonPressed={() => {
                radioButtonPress("three");
                delay === "three" ? setDelay(null) : setDelay(3);
              }}
              pressed={radioButtonsState["three"]}
            ></RadioButton>
            <Image
              style={{ width: 20, height: 20, marginLeft: 16, marginRight: 8 }}
              source={require("./assets/cancelled.png")}
            />
            <Text style={fontStyles.textInputLabel}>{"cancelled"}</Text>
          </View>
        </View>
      </View>
      {/* status component */}
      <View
        style={{ marginTop: 16, padding: 8, elevation: 1, borderRadius: 2 }}
      >
        <Text style={{ ...fontStyles.lineTitle, marginBottom: 16 }}>
          {"Status:"}
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              onButtonPressed={() => {
                statusButtonPress("zero");
                status === "zero" ? setStatus(null) : setStatus(0);
              }}
              pressed={statusButtonsState["zero"]}
            ></RadioButton>
            <Image
              style={{ width: 24, height: 24, marginLeft: 12, marginRight: 4 }}
              source={require("./assets/ideal.png")}
            />
            <Text style={fontStyles.textInputLabel}>{"Ideal"}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              onButtonPressed={() => {
                statusButtonPress("two");
                status === "two" ? setStatus(null) : setStatus(2);
              }}
              pressed={statusButtonsState["two"]}
            ></RadioButton>
            <Image
              style={{
                width: 24,
                height: 24,
                marginLeft: 12,
                marginRight: 4,
              }}
              source={require("./assets/frown.png")}
            />
            <Text style={fontStyles.textInputLabel}>{"Serious problems"}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <RadioButton
              onButtonPressed={() => {
                statusButtonPress("one");
                status === "one" ? setStatus(null) : setStatus(1);
              }}
              pressed={statusButtonsState["one"]}
            ></RadioButton>
            <Image
              style={{
                width: 24,
                height: 24,
                marginLeft: 12,
                marginRight: 4,
              }}
              source={require("./assets/meh.png")}
            />
            <Text style={fontStyles.textInputLabel}>{"Acceptable"}</Text>
          </View>
          <View
            style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
          />
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 32 }}>
        <PrimaryButton
          title="Done"
          onPress={() => {
            postIsValid()
              ? new CommunicationController()
                  .addPost(data)
                  .then(navigation.goBack())
                  .catch((error) => console.log(error))
              : console.log("empty post");
          }}
        />
      </View>
    </View>
  );
}
