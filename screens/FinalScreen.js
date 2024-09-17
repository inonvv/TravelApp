import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import Layout from "../components/Layout";

const FinalScreen = ({ route, navigation }) => {
  const { data, selectedHotels } = route.params;
  const getSelectedHotel = (cityName) => {
    const selectedHotel = selectedHotels.find(
      (hotel) => hotel.city.name === cityName
    );
    return selectedHotel || `No hotel selected. Default: ${cityName} Hotel`;
  };

  if (!data) {
    console.log("Route params:", route.params);
    console.log(data);

    return (
      <Layout>
        <Button onPress={() => navigation.navigate("Home")}>Go to Home</Button>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.headlineContainer}>
        <Text style={styles.headline}>CONGRATULAITON! Enjoy your Trip</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>Your Travel Summary</Title>

        {data.map((item, index) => {
          const toCityName = item.flight?.to?.city?.name || "Unknown City";
          const fromCityName = item.flight?.from?.city?.name || "Unknown City";
          const departureDate = item.flight.departure
            ? new Date(item.flight.departure).toLocaleString()
            : "Unknown Departure";
          const selectedHotel = getSelectedHotel(toCityName);

          return (
            <Card key={index} style={styles.card}>
              <Card.Content>
                <Title style={styles.title}>
                  {fromCityName} → {toCityName}
                </Title>
                <Paragraph style={styles.paragraph}>
                  <Text style={styles.label}>Departure:</Text> {departureDate}
                </Paragraph>
                <Paragraph style={styles.paragraph}>
                  <Text style={styles.label}>Selected Hotel:</Text>{" "}
                  {typeof selectedHotel === "string"
                    ? selectedHotel
                    : selectedHotel.name}
                </Paragraph>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
    </Layout>
  );
};

export default FinalScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F0F4F7",
  },
  headlineContainer: {
    marginBottom: 20,
  },
  headline: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "lightblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    borderColor: "purple",
    borderWidth: 6,
    borderStyle: "ridge",
    textAlign: "center",
    overflow: "hidden",
    fontStyle: "italic",
    shadowColor: "#4B0082", // Darker purple shadow
    shadowOffset: { width: 0, height: 10 }, // Larger shadow offset for more depth
    shadowOpacity: 1, // Full opacity for strong shadow
    shadowRadius: 20, // Larger radius for more spread
    elevation: 15, // For Android
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  label: {
    fontWeight: "500",
    color: "#1A1A1A",
  },
  finishButton: {
    marginTop: 20,
    backgroundColor: "lightblue",
    alignSelf: "center",
    width: "50%",
  },
});
