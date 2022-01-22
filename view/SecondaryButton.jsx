import React, { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useFonts, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { fontStyles } from "../TreEstStyles";
import { Feather } from "@expo/vector-icons";

export default function SecondaryButton({ title, onPress, iconName }) {
  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
  });
  let [buttonPressed, toggleButtonPressed] = useState(false);
  return fontsLoaded ? (
    <Pressable
      onPressIn={() => toggleButtonPressed(true)}
      onPressOut={() => toggleButtonPressed(false)}
      onPress={() => {
        onPress();
      }}
      style={({ pressed }) => [
        {
          borderColor: pressed ? "#C4C4C4" : "#272559",
        },
        styles.wrapperCustom,
      ]}
    >
      <Text
        style={
          buttonPressed
            ? fontStyles.secondaryButtonTextPressed
            : fontStyles.secondaryButtonText
        }
      >
        {title.toUpperCase()}
      </Text>
      <Feather
        name={iconName}
        size={20}
        color={buttonPressed ? "#C4C4C4" : "#272559"}
        style={{ marginLeft: 8 }}
      />
    </Pressable>
  ) : (
    <Pressable
      onPress={() => {
        onPress();
      }}
      style={({ pressed }) => [
        {
          borderColor: pressed ? "#C4C4C4" : "#272559",
        },
        styles.wrapperCustom,
      ]}
    ></Pressable>
  );
}

let styles = StyleSheet.create({
  wrapperCustom: {
    borderRadius: 20,
    padding: 4,
    width: 116,
    justifyContent: "center",
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 20,
  },
});
