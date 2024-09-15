import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const Layout = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingTop: insets.top + 150,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {children}
    </ScrollView>
  );
};
export default Layout;
const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
});
