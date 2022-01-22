import React from "react";
import { ActivityIndicator, StyleSheet, View, Image } from "react-native";

export default function SpinningWheel() {
  return (
    <View style={{ marginTop: 100 }}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ width: 100, height: 100, marginBottom: 24 }}
          source={require("./assets/favicon.png")}
        />
        <ActivityIndicator size="large" color="#04C4D9" />
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});
