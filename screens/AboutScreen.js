import { StyleSheet, Text } from "react-native";
import React from "react";
import Layout from "../components/Layout"; // Import Layout component
import Maps from "../components/Maps";

const AboutScreen = () => {
  return (
    <Layout>
      <Text style={styles.title}>About Screen</Text>
    </Layout>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
});
