import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Card, TextInput, Button, Title, Paragraph } from "react-native-paper";
import CryptoJS from "crypto-js";
import Layout from "../components/Layout";
import { useUser } from "../context/UserContext"; // Import useUser
import Toast from "react-native-toast-message"; // Import Toast

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const { setUser: setGlobalUser } = useUser(); // Get setUser from context

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type, // 'success' or 'error'
      text1: text1,
      text2: text2,
    });
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      return showToast(
        "error",
        "Sign In Failed",
        "One or more details are missing"
      );
    }

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
        navigation.replace("MainTabs");
        showToast(
          "success",
          "Login Successful",
          "You have successfully logged in!"
        );
      } else {
        showToast("error", "Login Failed", "One or more details are wrong");
      }
    } catch (error) {
      showToast("error", "Login Failed", error.message);
    }
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      return showToast(
        "error",
        "Sign up Failed",
        "One or more details are missing"
      );
    }
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
        navigation.replace("MainTabs");
        showToast(
          "success",
          "Sign Up Successful",
          `Hello, ${firstName} ${lastName}!`
        );
      } else {
        showToast(
          "error",
          "Sign Up Failed",
          "Unable to sign up, please try again."
        );
      }
    } catch (error) {
      showToast("error", "Sign Up Failed", error.message);
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
        {/* <Button
          onPress={() => navigation.replace("MainTabs")}
          style={styles.button}
        >
          Home
        </Button> */}
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
    shadowColor: "#4B0082",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 15,
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
