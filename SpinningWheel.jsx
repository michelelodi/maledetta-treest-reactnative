import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function SpinningWheel() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2196F3" />
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
