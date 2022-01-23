import React, { useContext, useEffect, useState } from "react";
import { SectionList, Text, View, Pressable, StyleSheet } from "react-native";
import CommunicationController from "./controller/CommunicationController";
import { fontStyles } from "./TreEstStyles";
import {
  AppDataContext,
  DirectionContext,
  RedirectContext,
  LinesContext,
} from "./AppContext";
import { Ionicons } from "@expo/vector-icons";
import SpinningWheel from "./SpinningWheel";
import { useFonts, Roboto_700Bold } from "@expo-google-fonts/roboto";

export default function LinesScreen({ navigation }) {
  let { sid, line, lines, shouldRedirect } = useContext(AppDataContext);

  let handleSelection = useContext(DirectionContext);
  let [linesState, setLinesState] = useState([]);
  let updateLines = useContext(LinesContext);
  let redirect = useContext(RedirectContext);

  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
  });

  useEffect(() => {
    if (line && shouldRedirect) {
      redirect();
      navigation.navigate("Board");
    }
    if (lines) setLinesState(lines);
    else
      new CommunicationController()
        .getLines({ sid: sid })
        .then((response) => {
          setLinesState(response);
          updateLines(response);
        })
        .catch((error) => {
          console.log(error);
          //TODO non setLines(null) ma mostra all'utente un alertdialog con message "C'è stato un errore inaspettato sulla rete. Riprova più tardi"
          setLinesState(null);
        });

    return () => {
      console.log("UNMOUNTING LINES");
    };
  }, []);

  return linesState && fontsLoaded ? (
    <View style={{ padding: 20 }}>
      <Text style={fontStyles.title}>{"Where are you \ngoing right now?"}</Text>
      <SectionList
        sections={linesState}
        keyExtractor={(item) => item.did}
        renderItem={({ item }) => (
          <Pressable
            style={styles.line_pressable}
            onPress={() => {
              handleSelection(item);
              navigation.navigate("Board");
            }}
          >
            <View style={styles.flex2}>
              <Text style={fontStyles.littleBlueTitle}>{"Departure"}</Text>
              <Text style={fontStyles.lineTitle}>
                {item.reverseSname.substr(0, item.reverseSname.indexOf(" ")) +
                  "\n" +
                  item.reverseSname.substr(item.reverseSname.indexOf(" ") + 1)}
              </Text>
            </View>
            <View style={{ ...styles.flex1_image }}>
              <Ionicons name="md-swap-horizontal" size={24} color="#04C4D9" />
            </View>
            <View style={styles.flex2}>
              <Text
                style={{ ...fontStyles.littleBlueTitle, textAlign: "right" }}
              >
                {"Arrival"}
              </Text>
              <Text
                style={{
                  ...fontStyles.lineTitle,
                  textAlign: "right",
                }}
              >
                {item.sname.substr(0, item.sname.indexOf(" ")) +
                  "\n" +
                  item.sname.substr(item.sname.indexOf(" ") + 1)}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  ) : (
    <SpinningWheel />
  );
}

let styles = StyleSheet.create({
  line_pressable: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginBottom: 20,
    elevation: 5,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#F2C641",
  },
  flex2: {
    flex: 2,
    flexDirection: "column",
  },
  flex1_image: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
