import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import Layout from "../components/Layout";
import { Card, Title, Paragraph, Button, Avatar } from "react-native-paper";
import axios from "axios";
import { useSelectedHotels } from "../context/SelectedHotelsContext"; // Import the context

const LeftContent = (props) => <Avatar.Icon {...props} icon="lightbulb" />;

const MoreDetailsScreen = ({ route, navigation }) => {
  const { selectedHotels, setSelectedHotels } = useSelectedHotels();
  const { cityNameArr, city } = route.params || {};
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.post(
          "https://yonixasp.bsite.net/api/Hotel/GetHotelsByCities",
          cityNameArr
        );
        const filteredHotels = response.data.filter(
          (hotel) => hotel.city.name === city
        );
        setHotels(filteredHotels);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setLoading(false);
      }
    };

    fetchHotels();
  }, [cityNameArr, city]);

  const handleSelectHotel = (hotel) => {
    const isAlreadySelected = selectedHotels.some(
      (selectedHotel) => selectedHotel.id === hotel.id
    );
    setSelectedHotel(hotel.id);
    if (!isAlreadySelected) {
      setSelectedHotels((prev) => [...prev, hotel]); // Add hotel if not already selected
    }

    navigation.navigate("About"); // Navigate to About screen
  };

  if (loading) {
    return (
      <Layout>
        <ActivityIndicator size="large" color="lightblue" />
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <Card
              key={index}
              style={[
                styles.card,
                selectedHotel === hotel.id && styles.activeCard, // Apply active style if selected
              ]}
            >
              <Card.Title
                title={hotel.name}
                titleStyle={styles.title}
                left={LeftContent}
              />
              <Card.Content>
                <Paragraph style={styles.paragraph}>
                  <Text style={styles.label}>Address:</Text> {hotel.address}
                </Paragraph>
                <Paragraph style={styles.paragraph}>
                  <Text style={styles.label}>City:</Text> {hotel.city.name}
                </Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained"
                  style={styles.selectButton}
                  onPress={() => handleSelectHotel(hotel)} // Handle selection
                >
                  Select
                </Button>
              </Card.Actions>
            </Card>
          ))
        ) : (
          <Text>No hotels available for {city}.</Text>
        )}
      </ScrollView>
    </Layout>
  );
};

export default MoreDetailsScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
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
  activeCard: {
    borderWidth: 2,
    borderColor: "lightblue", // Highlight selected card with blue border
  },
  title: {
    fontWeight: "bold", // Bold title
    fontSize: 18,
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
  },
  label: {
    fontWeight: "600",
  },
  selectButton: {
    marginTop: 10,
    backgroundColor: "lightblue", // Button color
  },
});
