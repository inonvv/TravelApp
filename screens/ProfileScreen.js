// screens/ProfileScreen.js
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Title, Subheading, Button, Divider } from "react-native-paper";

const ProfileScreen = ({ navigation }) => {
  const handleEditProfile = () => {};

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  const handleLogout = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Designer2.png")}
        style={styles.avatar}
      />

      <Title style={styles.title}>John Doe</Title>
      <Subheading style={styles.subheading}>@johndoe</Subheading>
      <Divider style={styles.divider} />
      <View style={styles.buttonContainer}>
        <Button
          mode="elevated"
          style={styles.button}
          onPress={handleEditProfile}
        >
          Edit Profile
        </Button>
        <Button mode="elevated" style={styles.button} onPress={handleSettings}>
          Settings
        </Button>
        <Button mode="elevated" style={styles.button} onPress={handleLogout}>
          Logout
        </Button>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    paddingTop: 50,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "white",
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 28,
  },
  subheading: {
    color: "white",
    fontSize: 18,
    marginBottom: 30,
  },
  divider: {
    width: "80%",
    backgroundColor: "white",
    marginVertical: 20,
  },
  buttonContainer: {
    width: "80%",
  },
  button: {
    marginVertical: 10,
  },
});
