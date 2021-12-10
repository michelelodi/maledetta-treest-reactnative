import React, { useContext, useEffect, useState } from "react";
import { SectionList, Text, Button } from "react-native";
import CommunicationController from "./controller/CommunicationController";
import { AppDataContext, DirectionContext } from "./AppContext";
import SpinningWheel from "./SpinningWheel";

export default function LinesScreen({ navigation }) {
  let { sid, line } = useContext(AppDataContext);
  let handleSelection = useContext(DirectionContext);
  let [lines, setLines] = useState([]);
  useEffect(() => {
    if (line) navigation.navigate("Board");
    else
      new CommunicationController()
        .getLines({ sid: sid })
        .then((response) => setLines(response))
        .catch((error) => {
          console.log(error);
          //TODO non setLines(null) ma mostra all'utente un alertdialog con message "C'è stato un errore inaspettato sulla rete. Riprova più tardi"
          setLines(null);
        });
    return () => {
      console.log("UNMOUNTING LINES");
    };
  }, [sid, line]);

  if (line) return <SpinningWheel />;
  else
    return lines ? (
      <SectionList
        sections={lines}
        keyExtractor={(item) => item.did}
        renderItem={({ item }) => (
          <Button
            title={"direzione " + item.sname}
            onPress={() => {
              handleSelection(item);
              navigation.navigate("Board");
            }}
          />
        )}
        renderSectionHeader={({ section: { data } }) => {
          return <Text>{data[0].sname + " - " + data[1].sname}</Text>;
        }}
      />
    ) : (
      <SpinningWheel />
    );
}
