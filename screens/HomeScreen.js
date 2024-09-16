// HomeScreen.js
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Layout from "../components/Layout";
import { cities2 } from "../LatLng/LatLng2";

import MapView, { Marker } from "react-native-maps";
import Tag from "../components/Tag";
import { Button } from "react-native-paper";

const HomeScreen = ({ navigation, route }) => {
  const [cityNameArr, setCityNameArr] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [position, setPosition] = useState(null);
  const [cityName, setCityName] = useState("");
  const searchText = route.params?.searchText;

  useEffect(() => {
    if (searchText && searchText.trim() !== "") {
      const searchInput = searchText.trim().toLowerCase();

      // Search for the city in cities2 by city name only
      const city = cities2.find((c) => {
        const cityName = c.name.split(",")[0].trim().toLowerCase();
        return cityName === searchInput;
      });

      if (city) {
        const cityName = city.name.split(",")[0].trim();

        if (!cityNameArr.includes(cityName)) {
          setCityNameArr((prevArr) => [...prevArr, cityName]);
          setMarkers((prevMarkers) => [
            ...prevMarkers,
            { latitude: city.lat, longitude: city.lng },
          ]);
        }
      } else {
        // City not found, display a message or handle accordingly
        console.log("City not found");
      }

      // Reset the searchText param
      navigation.setParams({ searchText: "" });
    }
  }, [searchText]);

  const onRegionChange = (region) => {
    const AutoCoords = autoLocation(region.latitude, region.longitude, cities2);
    setPosition({ latitude: AutoCoords.lat, longitude: AutoCoords.lng });
  };
  const autoLocation = (lat, lng, markers) => {
    const customMarker = { lat, lng };
    if (markers.length < 1) {
      return customMarker;
    }
    let minDis = calcDis(markers[0], customMarker);
    let mainMarker = markers[0];
    for (let index = 0; index < markers.length; index++) {
      const calculatedDistance = calcDis(markers[index], customMarker);
      if (calculatedDistance < minDis) {
        minDis = calculatedDistance;
        mainMarker = markers[index];
      }
    }
    return mainMarker;
  };
  const calcDis = (pointA, pointB) => {
    return Math.sqrt(
      Math.pow(pointB.lat - pointA.lat, 2) +
        Math.pow(pointB.lng - pointA.lng, 2)
    );
  };
  const CleanMarks = () => {
    setMarkers([]);
    setCityNameArr([]);
    setCityName("");
  };
  const addMarker = async (e) => {
    const newMarker = e.nativeEvent.coordinate;
    const AutoCoords = autoLocation(
      newMarker.latitude,
      newMarker.longitude,
      cities2
    );
    setMarkers([
      ...markers,
      { latitude: AutoCoords.lat, longitude: AutoCoords.lng },
    ]);
    const name = AutoCoords.name.split(",")[0];
    setCityName(name);
    setCityNameArr((prevArr) => [...prevArr, name]);
  };
  const removeCity = (index) => {
    setCityNameArr((prevArr) => prevArr.filter((_, i) => i !== index));
  };
  const FlyMeAtravel = async () => {
    console.log("fly me a travel", cityNameArr);

    try {
      const response = await fetch(
        "https://yonixasp.bsite.net/api/TripTicket/GetFlightTickets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ Cities: cityNameArr, userId: 4 }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigation.navigate("About", {
          screen: "AboutMain",
          params: { data },
        });
      } else {
        Alert.alert("Flight Tickets Failed", "One or more details are wrong");
      }
    } catch (error) {}
  };
  const ToSignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <Layout>
      <Text style={styles.title}>Choose your destinations</Text>
      <Button mode="elevated" onPress={CleanMarks} style={styles.button}>
        Clean
      </Button>
      <Button onPress={ToSignUp} style={styles.button}>
        SignUp
      </Button>
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
      </MapView>
      <View style={styles.listContainer}>
        <View style={styles.list}>
          {cityNameArr.map((item, index) => (
            <View key={index} style={styles.item}>
              <Tag index={index} txt={item} cancel={removeCity} />
            </View>
          ))}
        </View>
      </View>
      <Button
        mode="elevated"
        onPress={() => FlyMeAtravel()}
        style={styles.button}
      >
        Fly me!
      </Button>
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 18,
    color: "#333",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "lightblue",
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    width: "30%",
    alignSelf: "center",
  },
});
