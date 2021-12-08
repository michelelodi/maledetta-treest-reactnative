import React from "react";
import { NavigationContainer as NC } from "@react-navigation/native";
import { HomeStack, Tab, UserStack } from "./Navigator";
import LinesScreen from "./LinesScreen";
import ProfileScreen from "./ProfileScreen";
import ShowLineScreen from "./ShowLineScreen";
import AddPostScreen from "./AddPostScreen";

export default function NavigationContainer() {
  return (
    <NC>
      <Tab.Navigator
        screenOptions={{ headerShown: false, unmountOnBlur: true }}
      >
        <Tab.Screen name="Home">
          {() => (
            <HomeStack.Navigator>
              <HomeStack.Screen
                name="Lines"
                component={LinesScreen}
                options={{ title: "Home" }}
              />
              <HomeStack.Screen
                name="Board"
                component={ShowLineScreen}
                options={{ title: "Bacheca" }}
              />
              <HomeStack.Screen
                name="Post"
                component={AddPostScreen}
                options={{ title: "Aggiungi un Post" }}
              />
            </HomeStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="User">
          {() => (
            <UserStack.Navigator>
              <UserStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "Profile" }}
              />
            </UserStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NC>
  );
}