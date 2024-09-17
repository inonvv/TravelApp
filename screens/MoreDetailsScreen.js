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
import Toast from "react-native-toast-message"; // Import Toast

const LeftContent = (props) => <Avatar.Icon {...props} icon="lightbulb" />;

const MoreDetailsScreen = ({ route, navigation }) => {
  const { selectedHotels, setSelectedHotels } = useSelectedHotels();
  const { cityNameArr, city } = route.params || {};
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Function to show toast messages
  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type, // 'success' or 'error'
      text1: text1,
      text2: text2,
    });
  };

  // If loading persists, set a timeout for 2 seconds and navigate back to About
  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        showToast("error", "Loading Timeout", "Returning to About screen.");
        navigation.navigate("About"); // Navigate back to the About screen
      }, 2000); // 2 seconds timeout

      return () => clearTimeout(timeout); // Clear timeout on component unmount or if loading stops
    }
  }, [loading]);

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
        setLoading(false); // Stop loading when hotels are fetched
      } catch (error) {
        console.error("Error fetching hotels:", error);
        showToast("error", "No Destinations", "Please select a destination.");
        setTimeout(() => {
          navigation.navigate("About");
        }, 2000);
        setLoading(false); // Stop loading on error
        showToast("error", "Error", "Unable to fetch hotels");
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
      setSelectedHotels((prev) => [...prev, hotel]);
    }
    setTimeout(() => {
      showToast("success", "Hotel Selected", `Hotel ${hotel.name} selected.`);
      2000;
    });
    navigation.navigate("About"); // Navigate to About screen
  };

  // Handle loading state
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
          <Text>
            Choose destination First OR there is no hotels in your requested
            city.
          </Text>
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
