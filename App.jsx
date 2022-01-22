import React, { useState, useEffect } from "react";
import {
  AppDataContext,
  DirectionContext,
  LinesContext,
  RedirectContext,
} from "./AppContext";
import { appSetUp, saveCurrentLine } from "./controller/AppController";
import NavigationContainer from "./NavigationContainer";
import SpinningWheel from "./SpinningWheel";
import { Image, View } from "react-native";

export default function App() {
  let [line, setLine] = useState(null);
  let [sid, setSid] = useState(null);
  let [lines, setLines] = useState(null);
  let [shouldRedirect, setShouldRedirect] = useState(true);

  const appData = {
    sid: sid,
    line: line,
    lines: lines,
    shouldRedirect: shouldRedirect,
  };

  useEffect(() => {
    appSetUp()
      .then((response) => {
        setLine(JSON.parse(response["line"]));
        setSid(response["sid"]);
      })
      .catch((error) => console.log(error));
    return () => {
      console.log("UNMOUNTING APP");
    };
  }, []);

  return sid && (line || lines) ? (
    <AppDataContext.Provider value={appData}>
      <DirectionContext.Provider
        value={(line) => {
          setLine(line);
          saveCurrentLine(line);
        }}
      >
        <LinesContext.Provider value={(lines) => setLines(lines)}>
          <RedirectContext.Provider
            value={() => {
              if (shouldRedirect) setShouldRedirect(false);
            }}
          >
            <NavigationContainer />
          </RedirectContext.Provider>
        </LinesContext.Provider>
      </DirectionContext.Provider>
    </AppDataContext.Provider>
  ) : (
    <SpinningWheel />
  );
}
