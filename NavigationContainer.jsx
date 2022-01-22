import React, { useState } from "react";
import { NavigationContainer as NC } from "@react-navigation/native";
import { HomeStack, Tab, UserStack } from "./Navigator";
import LinesScreen from "./LinesScreen";
import ProfileScreen from "./ProfileScreen";
import ShowLineScreen from "./ShowLineScreen";
import AddPostScreen from "./AddPostScreen";
import MapScreen from "./MapScreen";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  ProfileContext,
  UpdateProfileContext,
  StationsContext,
  UpdateStationsContext,
} from "./AppContext";
import { Image, Text, View } from "react-native";
import { fontStyles } from "./TreEstStyles";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";

function LogoTitle() {
  let [fontsLoaded] = useFonts({
    Raleway_700Bold,
  });
  return fontsLoaded ? (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        style={{ width: 40, height: 40, marginRight: 8 }}
        source={require("./assets/icon.png")}
      />
      <Text style={fontStyles.headerLogo}>{"TreEst"}</Text>
    </View>
  ) : (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        style={{ width: 50, height: 50 }}
        source={require("./assets/icon.png")}
      />
    </View>
  );
}

export default function NavigationContainer() {
  let [profileData, setProfileData] = useState({
    name: null,
    pversion: null,
    uid: null,
    picture: null,
  });

  let [stations, setStations] = useState({});

  return (
    <ProfileContext.Provider value={profileData}>
      <UpdateProfileContext.Provider
        value={(data) => {
          setProfileData(data);
        }}
      >
        <StationsContext.Provider value={stations}>
          <UpdateStationsContext.Provider
            value={(updatedStations) => setStations(updatedStations)}
          >
            <NC>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                      iconName = (
                        <Ionicons
                          name="subway-outline"
                          size={size}
                          color={color}
                        />
                      );
                    } else if (route.name === "User") {
                      iconName = (
                        <Feather name="user" size={size} color={color} />
                      );
                    }
                    return iconName;
                  },
                  tabBarActiveTintColor: "#04C4D9",
                  tabBarInactiveTintColor: "#272559",
                  headerShown: false,
                  unmountOnBlur: true,
                })}
              >
                <Tab.Screen name="Home">
                  {() => (
                    <HomeStack.Navigator>
                      <HomeStack.Screen
                        name="Lines"
                        component={LinesScreen}
                        options={{
                          headerTitle: (props) => <LogoTitle {...props} />,
                          contentStyle: { backgroundColor: "white" },
                        }}
                      />
                      <HomeStack.Screen
                        name="Board"
                        component={ShowLineScreen}
                        options={{
                          headerTitle: (props) => <LogoTitle {...props} />,
                          contentStyle: { backgroundColor: "white" },
                        }}
                      />
                      <HomeStack.Screen
                        name="Post"
                        component={AddPostScreen}
                        options={{
                          headerTitle: (props) => <LogoTitle {...props} />,
                          contentStyle: { backgroundColor: "white" },
                        }}
                      />
                      <HomeStack.Screen
                        name="Map"
                        component={MapScreen}
                        options={{
                          headerTitle: (props) => <LogoTitle {...props} />,
                          contentStyle: { backgroundColor: "white" },
                        }}
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
                        options={{
                          headerTitle: (props) => <LogoTitle {...props} />,
                          contentStyle: { backgroundColor: "white" },
                        }}
                      />
                    </UserStack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            </NC>
          </UpdateStationsContext.Provider>
        </StationsContext.Provider>
      </UpdateProfileContext.Provider>
    </ProfileContext.Provider>
  );
}
