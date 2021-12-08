import React from "react";
import { FlatList, View, Text } from "react-native";

export default function Posts({ data }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <View style={{ borderWidth: 1 }}>
            {Object.keys(item).map((k, i) => {
              return (
                <Text key={i}>
                  {k}: {item[k]}
                </Text>
              );
            })}
          </View>
        );
      }}
      keyExtractor={(_, i) => i}
    />
  );
}
