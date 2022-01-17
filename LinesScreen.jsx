import React, { useContext, useEffect, useState } from "react";
import { SectionList, Text, Button } from "react-native";
import CommunicationController from "./controller/CommunicationController";
import {
  AppDataContext,
  DirectionContext,
  RedirectContext,
  LinesContext,
} from "./AppContext";
import SpinningWheel from "./SpinningWheel";

export default function LinesScreen({ navigation }) {
  let { sid, line, lines, shouldRedirect } = useContext(AppDataContext);

  let handleSelection = useContext(DirectionContext);
  let [linesState, setLinesState] = useState([]);
  let updateLines = useContext(LinesContext);
  let redirect = useContext(RedirectContext);

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

  return linesState ? (
    <SectionList
      sections={linesState}
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
