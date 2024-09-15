import { StyleSheet } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { Button } from "react-native-paper";

const Maps = () => {
  return (
    <MapView
      showsUserLocation={true}
      showsMyLocationButton={true}
      showsCompass={true}
      showsScale={true}
      onRegionChangeComplete={onRegionChange}
      onPress={addMarker}
      style={styles.map}
    >
      {markers.map((marker, index) => (
        <Marker key={index} coordinate={marker} />
      ))}
      <Button
        style={styles.button}
        mode="elevated"
        onPress={() => CleanMarks()}
      >
        clean
      </Button>
    </MapView>
  );
};

export default Maps;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 400,
  },
  button: {
    width: "50%",
  },
});
