import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Title, Paragraph } from "react-native-paper";
import { useUser } from "../context/UserContext";
import axios from "axios";
import Layout from "../components/Layout";

const SettingsScreen = ({ navigation }) => {
  const { user, setUser } = useUser();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    console.group("Task 1");
    console.log("Task activity 1", firstName, lastName, email);

    setLoading(true);

    try {
      const updatedUser = {
        id: user.id,
        firstName,
        lastName,
        email,
        password: user.password,
      };

      const response = await axios.put(
        `https://yonixasp.bsite.net/api/Users/${user.id}`,
        updatedUser
      );
      console.log("Task activity 2");
      console.log("response: ", response);
      console.log("Task activity 3");

      console.groupEnd();

      if (response.status === 204) {
        setUser(updatedUser);
        Alert.alert(
          "Profile Updated",
          "Your profile information has been updated successfully."
        );
        navigation.navigate("Profile");
      } else {
        console.log("response: ", response);
        Alert.alert("Update Failed", "Failed to update profile information.");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Title style={styles.title}>Edit Profile</Title>
        <Paragraph>Update your profile information below.</Paragraph>

        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          mode="outlined"
        />

        <Button
          mode="elevated"
          onPress={handleUpdateProfile}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Updating..." : "Save Changes"}
        </Button>
      </View>
    </Layout>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "lightblue",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  button: {
    marginTop: 20,
  },
});
