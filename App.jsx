import React, { useState, useEffect } from "react";
import { AppDataContext, DirectionContext } from "./AppContext";
import { appSetUp, saveCurrentLine } from "./controller/AppController";
import NavigationContainer from "./NavigationContainer";
import SpinningWheel from "./SpinningWheel";

export default function App() {
  let [line, setLine] = useState(null);
  let [sid, setSid] = useState(null);

  useEffect(() => {
    appSetUp((data) => {
      setSid(data["sid"]);
      setLine(JSON.parse(data["line"]));
    });
    return () => {
      console.log("UNMOUNTING APP");
    };
  }, []);

  return sid ? (
    <AppDataContext.Provider value={{ sid: sid, line: line }}>
      <DirectionContext.Provider
        value={(line) => {
          setLine(line);
          saveCurrentLine(line);
        }}
      >
        <NavigationContainer />
      </DirectionContext.Provider>
    </AppDataContext.Provider>
  ) : (
    <SpinningWheel />
  );
}
