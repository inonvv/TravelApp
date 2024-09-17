import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Title, Paragraph } from "react-native-paper";
import { useUser } from "../context/UserContext";
import axios from "axios";
import Layout from "../components/Layout";
import Toast from "react-native-toast-message"; // Import Toast

const SettingsScreen = ({ navigation }) => {
  const { user, setUser } = useUser();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);

  // Function to show toast messages
  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type, // 'success' or 'error'
      text1: text1,
      text2: text2,
    });
  };

  const handleUpdateProfile = async () => {
    if (!firstName || !lastName || !email) {
      // Check if any fields are empty and show error toast
      return showToast(
        "error",
        "Update Failed",
        "Please fill out all fields before saving."
      );
    }

    setLoading(true);

    try {
      const updatedUser = {
        id: user.id,
        firstName,
        lastName,
        email,
        password: user.password, // Keeping the password unchanged
      };

      const response = await axios.put(
        `https://yonixasp.bsite.net/api/Users/${user.id}`,
        updatedUser
      );

      if (response.status === 204) {
        setUser(updatedUser);
        showToast(
          "success",
          "Profile Updated",
          "Your profile was updated successfully."
        );
        navigation.navigate("Profile");
      } else {
        showToast(
          "error",
          "Update Failed",
          "Failed to update profile information."
        );
      }
    } catch (error) {
      showToast("error", "Error", `An error occurred: ${error.message}`);
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
