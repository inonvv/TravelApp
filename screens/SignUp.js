// SignUp.js
import React, { useState } from "react";
import { StyleSheet, View, Alert, TouchableOpacity, Text } from "react-native";
import {
  Card,
  TextInput,
  Button,
  Title,
  Paragraph,
  Headline,
} from "react-native-paper";
import CryptoJS from "crypto-js";
import Layout from "../components/Layout";
import { useUser } from "../context/UserContext"; // Import useUser

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const { setUser: setGlobalUser } = useUser(); // Get setUser from context

  const handleSignIn = async () => {
    try {
      const hashedPassword = CryptoJS.SHA256(password).toString();
      const response = await fetch(
        "https://yonixasp.bsite.net/api/Users/signIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setGlobalUser(data);
        setUser(data);
        Alert.alert("Login Successful");
        setTimeout(() => {
          navigation.replace("MainTabs");
        }, 3500);
      } else {
        Alert.alert("Login Failed", "One or more details are wrong");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const hashedPassword = CryptoJS.SHA256(password).toString();
      const response = await fetch(
        "https://yonixasp.bsite.net/api/Users/signUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: hashedPassword,
            firstName,
            lastName,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setGlobalUser(data);
        setUser(data);
        Alert.alert("Sign Up Successful", `Hello, ${firstName} ${lastName}!`);
        setTimeout(() => {
          navigation.replace("MainTabs");
        }, 2500);
      } else {
        Alert.alert("Sign Up Failed", "Unable to sign up, please try again.");
      }
    } catch (error) {
      Alert.alert("Sign Up Failed", error.message);
    }
  };

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Hello, {firstName} {lastName}!
        </Text>
      </View>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.headlineContainer}>
          <Text style={styles.headline}>Welcome to the Travel App</Text>
        </View>
        <Button title="Home" onPress={() => navigation.replace("MainTabs")}>
          Home
        </Button>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </Title>
            <Paragraph style={styles.paragraph}>
              {isSignUp
                ? "Please fill in the form to create an account."
                : "Sign in to continue."}
            </Paragraph>
            {isSignUp && (
              <>
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
              </>
            )}
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              mode="outlined"
            />
            <Button
              mode="elevated"
              onPress={isSignUp ? handleSignUp : handleSignIn}
              style={styles.button}
            >
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
              <Text style={styles.switchText}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    width: "100%",
    marginTop: -150,
    paddingHorizontal: 1,
    paddingVertical: 50,
    borderRadius: 20,
  },
  headlineContainer: {
    // Added a container to apply shadow to the headline
    marginBottom: 20,
  },
  headline: {
    fontSize: 32,
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
    width: "90%",
    maxWidth: 400,
    backgroundColor: "lightblue",
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    backgroundColor: "white",
  },
  button: {
    marginTop: 10,
    width: "70%",
    alignSelf: "center",
  },
  switchText: {
    color: "white",
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
