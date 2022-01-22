import React, { useState } from "react";
import { View, Pressable } from "react-native";

export default function RadioButton({ onButtonPressed, pressed }) {
  return (
    <Pressable
      onPress={() => {
        onButtonPressed();
      }}
      style={{
        height: 24,
        width: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#272559",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {pressed ? (
        <View
          style={{
            height: 16,
            width: 16,
            borderRadius: 4,
            backgroundColor: "#04C4D9",
          }}
        />
      ) : null}
    </Pressable>
  );
}
