import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useFonts, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { fontStyles } from "../TreEstStyles";

export default function PrimaryButton({ title, onPress }) {
  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
  });
  return fontsLoaded ? (
    <Pressable
      onPress={() => {
        onPress();
      }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#BDEDF2" : "#04C4D9",
        },
        styles.wrapperCustom,
      ]}
    >
      <Text style={fontStyles.primaryButtonText}>{title.toUpperCase()}</Text>
    </Pressable>
  ) : (
    <Pressable
      onPress={() => {
        onPress();
      }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#BDEDF2" : "#04C4D9",
        },
        styles.wrapperCustom,
      ]}
    ></Pressable>
  );
}

let styles = StyleSheet.create({
  wrapperCustom: {
    borderRadius: 20,
    padding: 10,
    width: 167,
    alignItems: "center",
  },
});
