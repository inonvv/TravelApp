import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { Card, Title, Paragraph, Button, List } from "react-native-paper";
import Layout from "../components/Layout";
import axios from "axios";
import { useSelectedHotels } from "../context/SelectedHotelsContext";

const UNSPLASH_ACCESS_KEY = "lHBWLGm7YURX1Uk9XrDLxNSvcrtwC1rLY5k3rjF5CTs";

const AboutScreen = ({ route, navigation }) => {
  const { data, cityNameArr } = route.params || {};
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const { selectedHotels } = useSelectedHotels();

  if (!data) {
    return (
      <Layout>
        <Button onPress={() => navigation.navigate("Home")}>Go to Home</Button>
      </Layout>
    );
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const cityNames = data.map((item) => item.flight.to.city.name);
        const uniqueCityNames = [...new Set(cityNames)];
        const newImages = {};

        for (const cityName of uniqueCityNames) {
          try {
            const response = await axios.get(
              `https://api.unsplash.com/search/photos`,
              {
                params: {
                  query: cityName,
                  client_id: UNSPLASH_ACCESS_KEY,
                  per_page: 1,
                  orientation: "landscape",
                },
              }
            );

            if (response.data.results.length > 0) {
              newImages[cityName] = response.data.results[0].urls.small;
            } else {
              newImages[cityName] =
                "https://via.placeholder.com/400x200?text=Image+Not+Available";
            }
          } catch (error) {
            console.error(`Error fetching image for ${cityName}:`, error);
            newImages[cityName] =
              "https://via.placeholder.com/400x200?text=Image+Not+Available";
          }
        }

        setImages(newImages);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetchImages:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, [data]);

  if (loading) {
    return (
      <Layout>
        <ActivityIndicator size="large" color="lightblue" />
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        {data.map((item, index) => {
          try {
            const toCityName = item.flight?.to?.city?.name || "Unknown City";
            const fromCityName =
              item.flight?.from?.city?.name || "Unknown City";
            const imageUrl = images[toCityName];
            const departureDate = item.flight.departure
              ? new Date(item.flight.departure).toLocaleString()
              : "Unknown Departure";
            const arrivalDate = item.flight.arrival
              ? new Date(item.flight.arrival).toLocaleString()
              : "Unknown Arrival";

            return (
              <Card key={index} style={styles.card}>
                {imageUrl && (
                  <Image source={{ uri: imageUrl }} style={styles.image} />
                )}
                <Card.Content style={styles.cardContent}>
                  <Title
                    style={styles.title}
                  >{`${fromCityName} → ${toCityName}`}</Title>
                  <Paragraph style={styles.paragraph}>
                    <Text style={styles.label}>Departure:</Text> {departureDate}
                  </Paragraph>
                  <Paragraph style={styles.paragraph}>
                    <Text style={styles.label}>Arrival:</Text> {arrivalDate}
                  </Paragraph>
                </Card.Content>
              </Card>
            );
          } catch (error) {
            console.error(`Error rendering card at index ${index}:`, error);
            return null;
          }
        })}
        <Title style={styles.listTitle}>Check Cities Hotels:</Title>
        <View style={styles.listContainer}>
          {cityNameArr.map((city, index) => (
            <View key={index} style={styles.cityContainer}>
              <List.Item
                title={city}
                titleStyle={styles.listItemText}
                left={() => <List.Icon icon="map-marker" color="#1A73E8" />}
                style={styles.listItem}
              />
              <Button
                style={styles.button}
                mode="elevated"
                onPress={() =>
                  navigation.navigate("MoreDetails", {
                    screen: "MoreDetailsMain",
                    params: {
                      cityNameArr,
                      city,
                    },
                  })
                }
              >
                Check Hotels
              </Button>
            </View>
          ))}
        </View>
        <Button>Book A Travel!</Button>
      </ScrollView>
    </Layout>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F0F4F7",
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
  image: {
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  button: {
    marginTop: 10,
    width: "50%",
    alignSelf: "right",
  },
});
