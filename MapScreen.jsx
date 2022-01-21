import React, { useEffect, useContext, useState } from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import { AppDataContext, StationsContext } from "./AppContext";
import SpinningWheel from "./SpinningWheel";
import { locationPermissionAsync } from "./controller/LocationController";
import { StyleSheet } from "react-native";

export default function MapScreen() {
  let { _, line } = useContext(AppDataContext);
  let stations = useContext(StationsContext);
  let [locationPermissions, setLocationPermissions] = useState(false);
  let [region, setRegion] = useState(null);
  let [cameraIdle, setCameraIdle] = useState(true);
  let [markers, setMarkers] = useState([]);

  useEffect(() => {
    locationPermissionAsync()
      .then((response) => {
        setLocationPermissions(response);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (stations[line.did]) {
      setMarkers(stations[line.did]);
      setRegion({
        latitude: Number(
          stations[line.did][Math.floor((stations[line.did].length - 1) / 2)][
            "lat"
          ]
        ),
        longitude: Number(
          stations[line.did][Math.floor((stations[line.did].length - 1) / 2)][
            "lon"
          ]
        ),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }
  }, [stations]);

  return stations ? (
    <MapView
      style={styles.map}
      zoomControlEnabled={cameraIdle}
      showsUserLocation={locationPermissions && cameraIdle}
      showsMyLocationButton={locationPermissions && cameraIdle}
      initialRegion={region}
      moveOnMarkerPress={false}
      onRegionChange={() => {
        setCameraIdle(false);
        setMarkers([]);
      }}
      onRegionChangeComplete={() => {
        setCameraIdle(true);
        setMarkers(stations[line.did]);
      }}
    >
      <Polyline
        coordinates={markers.map((st) => ({
          latitude: Number(st["lat"]),
          longitude: Number(st["lon"]),
        }))}
        lineDashPattern={[0]}
        strokeWidth={2}
      />
      {markers.map((st) => {
        return (
          <Marker
            key={Number(st["lat"]) + Number(st["lon"])}
            title={st["sname"]}
            coordinate={{
              latitude: Number(st["lat"]),
              longitude: Number(st["lon"]),
            }}
          />
        );
      })}
    </MapView>
  ) : (
    <SpinningWheel />
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
